const http = require('http');
const { UVServiceWorker } = require('./uv.sw.js'); // Adjust the path if necessary
const UVHandler = require('./uv.handler.js'); // Adjust the path if necessary

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    // Proxy endpoint for UVServiceWorker
    if (req.method === 'POST' && req.url === '/proxy') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { url, method, headers, body: reqBody } = JSON.parse(body);
                const uvServiceWorker = new UVServiceWorker();
                const response = await uvServiceWorker.fetch({
                    request: { url, method, headers, body: reqBody }
                });
                res.writeHead(response.status, response.headers);
                res.end(response.body);
            } catch (error) {
                res.writeHead(error.response ? error.response.status : 500, { 'Content-Type': 'text/plain' });
                res.end(error.message);
            }
        });
    }
    // Search endpoint using UVHandler
    else if (req.method === 'GET' && req.url.startsWith('/search')) {
        const query = new URL(req.url, `http://${req.headers.host}`).searchParams.get('q');
        const result = UVHandler.search(query);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    }
    // Default response for other routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
