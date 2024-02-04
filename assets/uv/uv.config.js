/*global UVServiceWorker,__uv$config*/
/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in uv.config.js so it will not need to be modified.
 * However, if a user changes the location of uv.bundle.js/uv.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
importScripts('uv.bundle.js');
importScripts('uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

// Add a message event listener to receive messages from the client
self.addEventListener('message', (event) => {
  if (event.data.msg === 'search') {
    // Extract the search query from the message data
    const searchQuery = event.data.query.trim();
    // Check if the search query resembles a URL
    const isURL = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+/.test(searchQuery);
    
    // If it's not a URL, perform a Google search with the query
    if (!isURL) {
      // Construct the Google search URL
      const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      // Respond to the client with the Google search URL
      event.ports[0].postMessage({ url: googleSearchURL });
    } else {
      // If it's a URL, respond to the client with the URL itself
      event.ports[0].postMessage({ url: searchQuery });
    }
  }
});
