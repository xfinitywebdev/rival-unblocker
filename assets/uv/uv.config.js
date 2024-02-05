/* globals UVServiceWorker, __uv$config */
import { Ultraviolet } from 'uv.bundle.js'; // Assuming uv.bundle.js exports Ultraviolet
import { UVServiceWorker } from 'uv.sw.js'; // Update the path if necessary

const config = __uv$config || {};

// Ensure default values for config properties
if (!config.bare) config.bare = '/bare/';
if (!config.prefix) config.prefix = '/service/';

const sw = new UVServiceWorker(config);

export { sw }; // Export the UVServiceWorker instance for use in other files
