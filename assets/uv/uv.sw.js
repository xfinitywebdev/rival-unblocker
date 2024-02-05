importScripts('uv.bundle.js'); // Update the path if necessary

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
    }

    async fetch({ request }) {
        let fetchedURL;

        try {
            if (!request.url.startsWith(location.origin + this.config.prefix)) {
                return await fetch(request);
            }

            const ultraviolet = new Ultraviolet(this.config, this.address);

            // Your existing fetch logic here...

            // Check if the request method is empty or not
            if (emptyMethods.includes(request.method)) {
                // If it's empty, return the response from the bare client
                return await this.bareClient.fetch(request);
            }

            // If it's not empty, return the response from the ultraviolet instance
            return await ultraviolet.fetch(request);
        } catch (err) {
            // Your existing error handling logic here...

            // Return a response with the error message
            return new Response(err.message, { status: 500 });
        }
    }
}

self.addEventListener('fetch', (event) => {
    const serviceWorker = new UVServiceWorker();
    event.respondWith(serviceWorker.fetch(event));
});
