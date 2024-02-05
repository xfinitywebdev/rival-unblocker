// uv.handler.js

// Define the UVHandler class
class UVHandler {
    // Constructor if needed

    // Method to handle search functionality
    static search(query) {
        // Your search logic here
        const isURL = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+/.test(query);
        
        if (!isURL) {
            // If it's not a URL, construct a Google search URL
            const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            return googleSearchURL;
        } else {
            // If it's a URL, return the URL itself
            return query;
        }
    }
}

// Export the UVHandler class
export default UVHandler;
