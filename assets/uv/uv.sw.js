importScripts('uv.bundle.js');
import { UVHandler } from './uv.handler.js'; // Import UVHandler class

const cspHeaders = [
    'cross-origin-embedder-policy',
    'cross-origin-opener-policy',
    'cross-origin-resource-policy',
    'content-security-policy',
    'content-security-policy-report-only',
    'expect-ct',
    'feature-policy',
    'origin-isolation',
    'strict-transport-security',
    'upgrade-insecure-requests',
    'x-content-type-options',
    'x-download-options',
    'x-frame-options',
    'x-permitted-cross-domain-policies',
    'x-powered-by',
    'x-xss-protection',
];
const emptyMethods = ['GET', 'HEAD'];

class UVServiceWorker extends Ultraviolet.EventEmitter {
    constructor(config = __uv$config) {
        super();
        if (!config.bare) config.bare = '/bare/';
        if (!config.prefix) config.prefix = '/service/';
        this.config = config;
        const addresses = (
            Array.isArray(config.bare) ? config.bare : [config.bare]
        ).map((str) => new URL(str, location).toString());
        this.address = addresses[~~(Math.random() * addresses.length)];
        this.bareClient = new Ultraviolet.BareClient(this.address);
        this.uvHandler = new UVHandler(config); // Initialize UVHandler
    }

    async fetch({ request }) {
        let fetchedURL;

        try {
            if (!request.url.startsWith(location.origin + this.config.prefix)) {
                return await fetch(request);
            }

            const ultraviolet = new Ultraviolet(this.config, this.address);

            // Handle incoming request using UVHandler
            let response = await this.uvHandler.handleRequest(request);

            // Check if the response is null or undefined
            if (!response) {
                // If response is not handled by UVHandler, proceed with Ultraviolet
                response = await ultraviolet.fetch(request);
            }

            // Handle outgoing response using UVHandler
            response = await this.uvHandler.handleResponse(response);

            // Perform additional actions after responding
            await this.uvHandler.afterResponse(request, response);

            return response;
        } catch (err) {
            // Handle errors appropriately
            console.error('Error in UVServiceWorker fetch:', err);
            return new Response('Internal Server Error', { status: 500 });
        }
    }
}

self.addEventListener('fetch', (event) => {
    const serviceWorker = new UVServiceWorker();
    event.respondWith(serviceWorker.fetch(event));
});
