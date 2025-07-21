// Create a file like src/config/api.js or src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Export the base URL for use throughout your app
export { API_BASE_URL };
