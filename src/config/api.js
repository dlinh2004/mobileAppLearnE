// API Configuration
// For React Native, use your machine's IP address instead of localhost
// Find your IP: On Windows, run: ipconfig (look for IPv4 Address)
// On Mac/Linux: ifconfig

// Change this to your machine's actual IP address
const API_HOST = '192.168.111.1'; // TODO: Update with your machine IP
const API_PORT = 3000;

// Or use this for development if you know the IP
export const API_BASE_URL = `http://${API_HOST}:${API_PORT}`;
export const CHAT_API_URL = `${API_BASE_URL}/api/chat`;

// For debugging
console.log('API Configuration:', {
  host: API_HOST,
  port: API_PORT,
  baseUrl: API_BASE_URL,
});
