// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold hover:text-gray-200">
          CRM App
        </Link>
        
        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/customers" className="hover:underline">Customers</Link>
              <Link to="/campaigns" className="hover:underline">Campaigns</Link>
              <Link to="/reports" className="hover:underline">Reports</Link>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-400 px-4 py-2 rounded text-blue-800 font-bold hover:bg-yellow-500 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
