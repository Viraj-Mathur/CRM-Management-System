import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CampaignDetailPage() {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [messageLogs, setMessageLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('ALL');

    // Fetch campaign details
    useEffect(() => {
        async function fetchCampaignDetail() {
            try {
                // const campaignResponse = await axios.get(`http://localhost:3000/api/campaigns/${id}`);
                const campaignResponse = await axios.get(`https://crm-management-system-1.onrender.com/api/campaigns/${id}`);
                setCampaign(campaignResponse.data);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            }
        }
        fetchCampaignDetail();
    }, [id]);

    // Fetch message logs for the campaign
    useEffect(() => {
        async function fetchMessageLogs() {
            try {
                setLoading(true);
                // const logsResponse = await axios.get(`http://localhost:3000/api/messages/logs?campaignId=${id}`);
                const logsResponse = await axios.get(`https://crm-management-system-1.onrender.com/api/messages/logs?campaignId=${id}`);
                setMessageLogs(logsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching message logs:', error);
                setLoading(false);
            }
        }
        fetchMessageLogs();
    }, [id]);

    // Retry sending a failed message
    const retryMessage = async (logId) => {
        try {
            await axios.post(`https://crm-management-system-1.onrender.com/api/messages/retry/${logId}`);
            alert('Message retried successfully!');
            // Refresh message logs
            const logsResponse = await axios.get(`https://crm-management-system-1.onrender.com/api/messages/logs?campaignId=${id}`);
            setMessageLogs(logsResponse.data);
        } catch (error) {
            console.error('Error retrying message:', error);
            alert('Failed to retry the message.');
        }
    };

    // Filter messages based on status
    const filteredLogs = messageLogs.filter((log) =>
        filterStatus === 'ALL' ? true : log.status === filterStatus
    );

    if (!campaign) return <p>Loading campaign details...</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{campaign.name}</h1>
            <p><strong>Customer ID:</strong> {campaign.customerId}</p>
            <p><strong>Message:</strong> {campaign.message}</p>
            <p><strong>Schedule Time:</strong> {new Date(campaign.ScheduleTime).toLocaleString()}</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Message Logs</h2>

            {/* Filter Section */}
            <div className="mb-4">
                <label htmlFor="filterStatus" className="mr-2">Filter by Status:</label>
                <select
                    id="filterStatus"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border px-2 py-1"
                >
                    <option value="ALL">All</option>
                    <option value="SENT">Sent</option>
                    <option value="FAILED">Failed</option>
                </select>
            </div>

            {/* Message Logs Table */}
            {loading ? (
                <p>Loading message logs...</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Log ID</th>
                            <th className="border px-4 py-2">Recipient</th>
                            <th className="border px-4 py-2">Status</th>
                            {/* <th className="border px-4 py-2">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map((log) => (
                            <tr key={log.id}>
                                <td className="border px-4 py-2">{log.id}</td>
                                <td className="border px-4 py-2">{log.customerId}</td>
                                <td className="border px-4 py-2">{log.status}</td>
                                <td className="border px-4 py-2">
                                    {log.status === 'FAILED' && (
                                        <button
                                            onClick={() => retryMessage(log.id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded"
                                        >
                                            Retry
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
