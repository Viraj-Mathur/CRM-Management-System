import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  
});

export const fetchCustomers = () => api.get('/customers');
export const createCampaign = (data) => api.post('/campaigns', data);

