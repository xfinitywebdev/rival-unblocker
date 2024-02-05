import { sw } from 'uv.config.js'; // Import the UVServiceWorker instance

// Add fetch event listener
self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

// Add message event listener for search functionality
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
