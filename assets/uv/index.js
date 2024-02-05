// index.js

import { sw } from 'uv.config.js'; // Import the UVServiceWorker instance
import UVHandler from 'uv.handler.js'; // Import the UVHandler
import { UVServiceWorker } from 'uv.sw.js'; // Import the UVServiceWorker

const config = __uv$config || {};
const handler = new UVHandler(config);

// Add fetch event listener
self.addEventListener('fetch', async (event) => {
  // Check if the request is for search
  if (event.request.url.includes('/search')) {
    // Extract the search query from the request URL
    const url = new URL(event.request.url);
    const query = url.searchParams.get('query');
    
    // Handle the search operation using the UVHandler
    const searchResult = await handler.handleSearch(query);

    if (searchResult) {
      // If search is successful, respond with the search result URL
      event.respondWith(new Response(searchResult, { status: 200 }));
    } else {
      // If search fails, respond with an error
      event.respondWith(new Response('Search failed', { status: 500 }));
    }
  } else {
    // For other requests, use the UVServiceWorker instance
    event.respondWith(sw.fetch(event));
  }
});

// Add message event listener for search functionality
self.addEventListener('message', (event) => {
  if (event.data.msg === 'search') {
    // Extract the search query from the message data
    const searchQuery = event.data.query.trim();
    
    // Perform the search operation using the UVHandler
    handler.handleSearch(searchQuery)
      .then((searchResult) => {
        // Respond to the client with the search result
        event.ports[0].postMessage({ url: searchResult });
      })
      .catch((error) => {
        // Respond with an error if search fails
        event.ports[0].postMessage({ error: error.message });
      });
  }
});
