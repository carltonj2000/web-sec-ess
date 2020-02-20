const express = require("express");
const helmet = require("helmet");
const crypto = require("crypto");
const csurf = require("csurf");
const localHost = require("https-localhost");
const session = require("express-session");
const bodyParser = require("body-parser");

const routeLogin = require("./routes/login");
const routeMessages = require("./routes/messages");

const port = 443;
const domain = "localhost.charlesproxy.com";

const app = localHost(domain);
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet.hsts({
    maxAge: 60 * 60 * 24 * 365,
    includeSubDomains: true,
    preload: true
  })
);

app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
});

app.use(bodyParser.json({ type: ["json", "application/csp-report"] }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      reportUri: "/report-violation"
    },
    reportOnly: false
  })
);

app.route("/report-violation").post((req, res) => {
  console.log("CSP Violation: ", req.body || "No data");
  res.status(200).send("ok");
});

app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "lax",
      secure: true,
      httpOnly: true
    }
  })
);

app.use(csurf());
app.use(function(err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403).send("csrf detected");
});

routeLogin(app);
routeMessages(app);

app.use("/static", express.static(__dirname + "/static"));

app.listen(port);

console.log(
  `open https://${domain} to observe localhost network traffic via Charles`
);

const redirApp = express();
redirApp.use(function(req, res) {
  return res.redirect(`https://${domain}${req.url}`);
});
redirApp.listen(80);
