// src/pages/LandingPage.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Redirect based on user authentication
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => navigate('/dashboard'), 300); // Smooth transition to dashboard
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#bbdefb] text-gray-900 p-8 transition-all duration-300 ease-in-out">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-indigo-700">
          Welcome to CRM & Campaign Manager
        </h1>
        <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-600">
          Manage customer relationships, create effective marketing campaigns, and track performance seamlessly with our CRM solution.
        </p>
      </header>

      {/* Features Section */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 mb-12 max-w-5xl text-center">
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
          <h3 className="text-xl font-semibold mb-3">Customer Management</h3>
          <p className="text-sm">Organize and manage your customer profiles, view engagement history, and categorize based on demographics.</p>
        </div>
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
          <h3 className="text-xl font-semibold mb-3">Campaign Management</h3>
          <p className="text-sm">Create and manage campaigns with personalized messages for targeted customer engagement.</p>
        </div>
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
          <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
          <p className="text-sm">Track and analyze campaign performance, customer retention, and sales pipeline with insightful metrics.</p>
        </div>
      </div>

      {/* Conditional Button Section */}
      {!user ? (
        <button
          onClick={handleLoginRedirect}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-200"
        >
          Get Started - Login
        </button>
      ) : (
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-200"
        >
          Go to Dashboard
        </button>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-500">
        <p>&copy; 2024 CRM & Campaign Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
