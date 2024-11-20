import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCampaigns() {
            try {
                // const response = await axios.get('http://localhost:3000/api/campaigns');
                const response = await axios.get('https://crm-management-system-1.onrender.com/api/campaigns');
                setCampaigns(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                setError('Failed to fetch campaigns. Please try again later.');
                setLoading(false);
            }
        }
        fetchCampaigns();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Campaign Dashboard</h1>

            {/* Create New Campaign Button */}
            <Link
                to="/create-campaign"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
            >
                Create New Campaign
            </Link>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                </div>
            )}

            {/* Campaigns Grid */}
            {loading ? (
                <p>Loading campaigns...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="p-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
                            <p><strong>Customer ID:</strong> {campaign.customerId}</p>
                            <p><strong>Schedule Time:</strong> {new Date(campaign.ScheduleTime).toLocaleString()}</p>
                            
                            {/* Link to Campaign Details */}
                            <Link
                                to={`/campaigns/${campaign.id}`}
                                className="text-blue-500 hover:underline mt-2 block"
                            >
                                View Details
                            </Link>

                            {/* Link to Message Logs */}
                            <Link
                                to={`/campaigns/${campaign.id}/message-logs`}
                                className="text-green-500 hover:underline mt-2 block"
                            >
                                View Message Logs
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
