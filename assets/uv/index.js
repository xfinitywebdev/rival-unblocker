// This is the Ultraviolet handler code with your index.js integrated

// Assuming this code is part of a larger Ultraviolet handler setup
// It's assumed that __uv, client, and other necessary objects are defined elsewhere

client.override(window, 'open', (target, that, args) => {
    if (!args.length) return target.apply(that, args);
    let [url] = args;

    url = __uv.rewriteUrl(url);

    return target.call(that, url);
});

__uv.performSearch = function () {
    console.log("Performing search...");
    // Temporary log to check if performSearch function is called
  
    window.navigator.serviceWorker
        .register("sw.js", {
            scope: __uv$config.prefix,
        })
        .then(() => {
            console.log("Service worker registered");
            let url = input.value.trim();
            if (!__uv.isUrl(url)) url = "https://www.google.com/search?q=" + url;
            else if (!(url.startsWith("https://") || url.startsWith("http://")))
                url = "http://" + url;
            localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
            __uv.location.href = "/~"; // Assuming __uv.location is properly set elsewhere
        })
        .catch(error => {
            console.error("Error registering service worker:", error);
        });
};

__uv.isUrl = function (val = "") {
    if (
        /^http(s?):\/\//.test(val) ||
        (val.includes(".") && val.substr(0, 1) !== " ")
    )
        return true;
    return false;
};

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting
    console.log("Form submitted");
    __uv.performSearch(); // Call the function to handle the search
});

// Listen for keydown event in the input field
input.addEventListener("keydown", async (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.keyCode === 13) {
        event.preventDefault(); // Prevent the default action (form submission)
        console.log("Enter key pressed");
        __uv.performSearch(); // Call the function to handle the search
    }
});
