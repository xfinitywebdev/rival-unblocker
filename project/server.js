const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(__dirname));

// Sample API endpoint for dynamic content
app.get('/api/data', (req, res) => {
    // Simulated dynamic data
    const dynamicData = { message: 'This is dynamic content from the server!' };
    res.json(dynamicData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
