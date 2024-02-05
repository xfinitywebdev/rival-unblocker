/* globals UVServiceWorker, __uv$config */
import { Ultraviolet } from 'uv.bundle.js'; // Assuming uv.bundle.js exports Ultraviolet
import { UVServiceWorker } from './uv.sw.js'; // Update the path if necessary
import { UVHandler } from './uv.handler.js'; // Import UVHandler class

const config = __uv$config || {};

// Ensure default values for config properties
if (!config.bare) config.bare = '/bare/';
if (!config.prefix) config.prefix = '/service/';

const sw = new UVServiceWorker(config);

// Initialize UVHandler with config
const uvHandler = new UVHandler(config);

export { sw, uvHandler }; // Export the UVServiceWorker instance and UVHandler for use in other files
