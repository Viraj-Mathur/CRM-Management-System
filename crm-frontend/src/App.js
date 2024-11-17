// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import Navbar from './Components/navbar';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/loginPage';
import Dashboard from './Pages/Dashboard';
import CustomerPage from './Pages/CustomerPage';
import AudiencePage from './Pages/AudiencePage';
import CampaignsPage from './Pages/CampaignsPage';
import CampaignDetailPage from './Pages/CampaignDetailPage';
import MessageLogsPage from './Pages/MessageLogsPage'; // New Message Logs Page
import ReportsPage from './Pages/ReportsPage';
import ProfilePage from './Pages/ProfilePage';
import CreateCampaignForm from './Pages/CreateCampaignForm';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar visible on all pages */}
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <CustomerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audience"
              element={
                <ProtectedRoute>
                  <AudiencePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRoute>
                  <CampaignsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns/:id"
              element={
                <ProtectedRoute>
                  <CampaignDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns/:id/message-logs"
              element={
                <ProtectedRoute>
                  <MessageLogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-campaign"
              element={
                <ProtectedRoute>
                  <CreateCampaignForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Redirect all other paths to Landing Page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
