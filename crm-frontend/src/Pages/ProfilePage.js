// src/Pages/ProfilePage.js
import React, { useState } from 'react';

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Marketing Manager',
  });

  const handleEditToggle = () => setEditing(!editing);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = () => {
    // Implement save functionality (API call, etc.)
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              disabled={!editing}
              className="mt-1 p-2 border rounded w-full bg-gray-50 text-gray-900"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              disabled={!editing}
              className="mt-1 p-2 border rounded w-full bg-gray-50 text-gray-900"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={userInfo.role}
              disabled
              className="mt-1 p-2 border rounded w-full bg-gray-50 text-gray-900"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Account Settings</h2>
          <button className="mt-4 text-blue-500 hover:underline" onClick={handleEditToggle}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
          {editing && (
            <button
              className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Security</h2>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update Password
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">Preferences</h2>
          <p className="text-gray-600 text-sm mt-2">Language, notifications, theme preferences, etc.</p>
          <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
            Edit Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
