const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(__dirname));

// Sample API endpoint for dynamic content - providing current time
app.get('/api/time', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.json({ time: currentTime });
});

// Sample API endpoint for proxy content
app.get('/api/proxy', (req, res) => {
    // Your code to fetch proxy content goes here
    const proxyContent = "<h2>This is proxy content</h2><p>Proxy content goes here...</p>";

    // Combine proxy content with current time
    const currentTime = new Date().toLocaleTimeString();
    const combinedContent = `<div id="current-time" style="position: fixed; top: 0; left: 0; background-color: rgba(255, 255, 255, 0.8); padding: 10px;">Current Time: ${currentTime}</div><div id="proxy-content" style="margin-top: 50px;">${proxyContent}</div>`;

    res.send(combinedContent);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
