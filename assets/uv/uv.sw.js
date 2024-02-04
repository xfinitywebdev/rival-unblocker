/*globals __uv$config*/
// Users must import the config (and bundle) prior to importing uv.sw.js
// This is to allow us to produce a generic bundle with no hard-coded paths.

/**
 * @type {import('../uv').UltravioletCtor}
 */
const Ultraviolet = self.Ultraviolet;

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
        /**
         * @type {InstanceType<Ultraviolet['BareClient']>}
         */
        this.bareClient = new Ultraviolet.BareClient(this.address);
    }
    /**
     *
     * @param {Event & {request: Request}} param0
     * @returns
     */
    async fetch({ request }) {
        /**
         * @type {string|void}
         */
        let fetchedURL;

        try {
            if (!request.url.startsWith(location.origin + this.config.prefix))
                return await fetch(request);

            const ultraviolet = new Ultraviolet(this.config, this.address);

            // Rest of the fetch method remains unchanged
            // ...
        } catch (err) {
            // Error handling remains unchanged
            // ...
        }
    }
    static Ultraviolet = Ultraviolet;
}

self.UVServiceWorker = UVServiceWorker;

// Remaining code for ResponseContext, RequestContext, isHtml, HookEvent, 
// hostnameErrorTemplate, errorTemplate, isBareError, and renderError remains unchanged
