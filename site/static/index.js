helloBtn.addEventListener("click", async e => {
  e.target.disabled = true;
  e.target.innerText = "Done!";
  await fetch("/", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "csrf-token": e.target.dataset.csrftoken,
      "Content-type": "application/x-www-form-urlencoded"
    },
    body: "message=hello"
  });
  window.location.reload();
});
