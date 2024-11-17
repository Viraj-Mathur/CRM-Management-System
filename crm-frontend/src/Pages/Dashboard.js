// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Components/AuthContext';
import { FaUsers, FaBullhorn, FaChartLine, FaTasks } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Placeholder for metrics; replace with dynamic data as needed
  const metrics = {
    activeCustomers: null,
    ongoingCampaigns: null,
    recentActivities: null,
    upcomingTasks: null,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-8">
      {/* Welcome Message */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-blue-900">Welcome, {user?.name || "User"}!</h2>
        <p className="text-gray-600 text-lg mt-2">Role: {user?.role || "Member"}</p>
      </div>

      {/* Quick Links Section */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mb-16 max-w-6xl mx-auto text-center">
        <Link to="/customers" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Manage Customers</h3>
          <p className="text-gray-500">View, edit, and manage all customer profiles</p>
        </Link>
        <Link to="/campaigns" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">Create Campaign</h3>
          <p className="text-gray-500">Launch new marketing campaigns to engage customers</p>
        </Link>
        <Link to="/reports" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">View Reports</h3>
          <p className="text-gray-500">Analyze performance with in-depth reports</p>
        </Link>
      </div>

      {/* Overview Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
        <div className="bg-blue-100 p-8 rounded-lg shadow-md flex flex-col items-center">
          <FaUsers className="text-3xl text-blue-700 mb-4" />
          <h4 className="text-xl font-semibold text-blue-800">Active Customers</h4>
          <p className="text-3xl font-bold text-blue-900">
            {metrics.activeCustomers ?? '---'}
          </p>
        </div>
        <div className="bg-green-100 p-8 rounded-lg shadow-md flex flex-col items-center">
          <FaBullhorn className="text-3xl text-green-700 mb-4" />
          <h4 className="text-xl font-semibold text-green-800">Ongoing Campaigns</h4>
          <p className="text-3xl font-bold text-green-900">
            {metrics.ongoingCampaigns ?? '---'}
          </p>
        </div>
        <div className="bg-yellow-100 p-8 rounded-lg shadow-md flex flex-col items-center">
          <FaChartLine className="text-3xl text-yellow-700 mb-4" />
          <h4 className="text-xl font-semibold text-yellow-800">Recent Activities</h4>
          <p className="text-3xl font-bold text-yellow-900">
            {metrics.recentActivities ?? '---'}
          </p>
        </div>
        <div className="bg-purple-100 p-8 rounded-lg shadow-md flex flex-col items-center">
          <FaTasks className="text-3xl text-purple-700 mb-4" />
          <h4 className="text-xl font-semibold text-purple-800">Upcoming Tasks</h4>
          <p className="text-3xl font-bold text-purple-900">
            {metrics.upcomingTasks ?? '---'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
