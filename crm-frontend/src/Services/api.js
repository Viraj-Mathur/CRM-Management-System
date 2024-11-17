// crm-frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',  // Replace with backend URL if different
    headers: { 'Content-Type': 'application/json' },
});

export default api;
