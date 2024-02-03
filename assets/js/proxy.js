const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Proxy endpoint
app.post('/proxy', async (req, res) => {
    const { url, method, headers, body } = req.body;

    try {
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

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
