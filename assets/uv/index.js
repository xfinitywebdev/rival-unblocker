const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting
  console.log("Form submitted");
  performSearch(); // Call the function to handle the search
});

// Listen for keydown event in the input field
input.addEventListener("keydown", async (event) => {
  // Check if the key pressed is Enter (key code 13)
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent the default action (form submission)
    console.log("Enter key pressed");
    performSearch(); // Call the function to handle the search
  }
});

function performSearch() {
  console.log("Performing search...");
  // Temporary log to check if performSearch function is called
  
  window.navigator.serviceWorker
    .register("sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      console.log("Service worker registered");
      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;
      localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "/~";
    })
    .catch(error => {
      console.error("Error registering service worker:", error);
    });
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}
