async function loadsw(){
  document.getElementById("rb").disabled = true;
  document.getElementById("rb").style.opacity = "0.5";
  try {
    await registerSW();
  } catch (err) {
    alert(err.toString());
    throw err;
  }
  const url = search("", "");

  var iframe = document.createElement('iframe');
  iframe.style.position = "absolute";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.top = "0px";
  iframe.style.left = "0px";
  iframe.style.display = "none";
  iframe.id = "iframe";
  iframe.style.zIndex = "9999999999999999";
  iframe.style.border = "none";
  iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
  document.body.appendChild(iframe);

  // Reload the page after appending the iframe
  window.location.reload(1);
}

document.getElementById("rb").addEventListener("click", loadsw);
