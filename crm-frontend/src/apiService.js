import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // or NEXT_PUBLIC_API_URL for Next.js
});

export const fetchCustomers = () => api.get('/customers');
export const createCampaign = (data) => api.post('/campaigns', data);
// Add other API calls here as needed
