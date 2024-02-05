const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Proxy endpoint
app.post('/proxy', async (req, res) => {
    const { url, method, headers, body } = req.body;

    try {
        // Check if the request URL is related to search functionality
        if (isSearchRelated(url)) {
            // If it's related to search, handle it differently or bypass the proxy
            // For example, you might implement search functionality directly here
            // or choose not to proxy the request
            // Handle search request...
            return res.status(400).send("Search requests are not proxied.");
        }

        // Proxy the request to the target URL
        const response = await axios({
            method: method || 'GET',
            url,
            headers,
            data: body
        });

        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

// Function to check if the request URL is related to search
function isSearchRelated(url) {
    // Add logic to identify search-related URLs
    // For example, check if the URL contains '/search' or '/query'
    return url.includes('/search') || url.includes('/query');
}

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
