import { sw, uvHandler } from 'uv.config.js'; // Import the UVServiceWorker instance and UVHandler

// Add fetch event listener
self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

// Add message event listener for search functionality
self.addEventListener('message', async (event) => {
  if (event.data.msg === 'search') {
    try {
      // Extract the search query from the message data
      const searchQuery = event.data.query.trim();
      // Check if the search query resembles a URL
      const isURL = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+/.test(searchQuery);

      let searchResult;
      // If it's not a URL, perform a Google search with the query
      if (!isURL) {
        // Construct the Google search URL
        const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        searchResult = { url: googleSearchURL };
      } else {
        // If it's a URL, use UVHandler to process the search query
        searchResult = await uvHandler.handleSearch(searchQuery);
      }
      // Respond to the client with the search result
      event.ports[0].postMessage(searchResult);
    } catch (error) {
      console.error('Error handling search:', error);
      // Respond with an error message if an error occurs
      event.ports[0].postMessage({ error: 'An error occurred while processing the search.' });
    }
  }
});
