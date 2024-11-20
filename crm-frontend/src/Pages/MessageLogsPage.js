import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MessageLogsPage() {
  const { id } = useParams(); // Campaign ID
  const [messageLogs, setMessageLogs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    totalCustomers: 0,
    totalSent: 0,
    totalFailed: 0,
  });

  // Fetch message logs for the specific campaign
  useEffect(() => {
    async function fetchMessageLogs() {
      try {
        setLoading(true);
        const response = await axios.get(
          // `http://localhost:3000/api/messages/logs?campaignId=${id}`
          `https://crm-management-system-1.onrender.com/api/messages/logs?campaignId=${id}`
        );
        const logs = response.data;

        // Update message logs
        setMessageLogs(logs);

        // Calculate statistics
        const totalSent = logs.filter((log) => log.status === "SENT").length;
        const totalFailed = logs.filter((log) => log.status === "FAILED").length;

        setStatistics({
          totalCustomers: logs.length,
          totalSent,
          totalFailed,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching message logs:", error);
        setLoading(false);
      }
    }
    fetchMessageLogs();
  }, [id]);

  // Retry sending a failed message
  const retryMessage = async (logId) => {
    try {
      await axios.post(
        `https://crm-management-system-1.onrender.com/api/messages/delivery-receipt/${logId}`
      );
      alert("Message retried successfully!");
      const response = await axios.get(
        `https://crm-management-system-1.onrender.com/api/messages/logs?campaignId=${id}`
      );
      setMessageLogs(response.data);
    } catch (error) {
      console.error("Error retrying message:", error);
      alert("Failed to retry the message.");
    }
  };

  // Trigger sending messages for the campaign
  const sendMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://crm-management-system-1.onrender.com/api/messages/send",
        { campaignId: id }
      );

      if (response.status === 200) {
        alert(response.data.message); // Show success message
        const logsResponse = await axios.get(
          `https://crm-management-system-1.onrender.com/sapi/messages/logs?campaignId=${id}`
        );
        setMessageLogs(logsResponse.data);
      } else {
        throw new Error("Unexpected response status"); // Handle unexpected response
      }
    } catch (error) {
      console.error("Error sending messages:", error);
      alert("Failed to send messages. Please check the logs for details.");
    } finally {
      setLoading(false);
    }
  };

  // Filter logs by status
  const filteredLogs =
    filterStatus === "ALL"
      ? messageLogs
      : messageLogs.filter((log) => log.status === filterStatus);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Message Logs</h1>

      {/* Campaign Statistics */}
      <div className="mb-4 p-4 bg-gray-100 border rounded">
        <h2 className="text-2xl font-semibold mb-2">Campaign Statistics</h2>
        <p><strong>Total Messages Sent:</strong> {statistics.totalCustomers}</p>
        <p><strong>Messages Sent:</strong> {statistics.totalSent}</p>
        <p><strong>Messages Failed:</strong> {statistics.totalFailed}</p>
      </div>

      {/* Send Messages Button */}
      <div className="mb-4">
        <button
          onClick={sendMessages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="filterStatus" className="mr-2">
          Filter by Status:
        </label>
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
      ) : filteredLogs.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Log ID</th>
              <th className="border px-4 py-2">Customer ID</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Timestamp</th>
              {/* <th className="border px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="border px-4 py-2">{log.id}</td>
                <td className="border px-4 py-2">{log.customerId}</td>
                <td className="border px-4 py-2">{log.message}</td>
                <td className="border px-4 py-2">{log.status}</td>
                <td className="border px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {log.status === "FAILED" && (
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
      ) : (
        <p>No logs available for this campaign.</p>
      )}
    </div>
  );
}
