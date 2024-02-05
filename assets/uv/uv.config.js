import { UVServiceWorker } from './uv.sw.js'; // Update the path if necessary

// Import the Ultraviolet class from the UV bundle
import Ultraviolet from './uv.bundle.js'; // Update the path if necessary

const config = window.__uv$config || {}; // Access __uv$config from the global window object

// Ensure default values for config properties
if (!config.bare) config.bare = '/bare/';
if (!config.prefix) config.prefix = '/service/';

// Create a new instance of UVServiceWorker with the provided config
const sw = new UVServiceWorker(config);

export { sw }; // Export the UVServiceWorker instance for use in other files
