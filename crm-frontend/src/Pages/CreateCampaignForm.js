// src/pages/CreateCampaignForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateCampaignForm() {
    const [formData, setFormData] = useState({
        name: '',
        customerId: '',
        message: '',
        scheduleTime: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/campaigns', formData);
            alert('Campaign created successfully!');
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert('Failed to create campaign.');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Create Campaign</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Campaign Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Customer ID</label>
                    <input 
                        type="number" 
                        name="customerId" 
                        value={formData.customerId}
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Message</label>
                    <textarea 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Schedule Time</label>
                    <input 
                        type="date" 
                        name="scheduleTime" 
                        value={formData.scheduleTime}
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded w-full" 
                        required 
                    />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Submit Campaign
                </button>
            </form>
        </div>
    );
}
