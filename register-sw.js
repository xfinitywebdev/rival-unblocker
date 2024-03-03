"use strict";

/**
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "/uv-sw.js";

/**
 * List of hostnames that are allowed to run serviceworkers on http:
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  )
    throw new Error("Service workers cannot be registered without https.");

  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register(stockSW, {
      scope: __uv$config.prefix,
    });
    console.log("Service worker registered:", registration);
  } catch (error) {
    console.error("Service worker registration failed:", error);
  }
}

// Call the registerSW function
registerSW();
