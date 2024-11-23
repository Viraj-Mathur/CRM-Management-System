// src/pages/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../Components/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const userData = { email: credentialResponse.email, role: 'user' };
    login(userData);
    navigate('/dashboard');
  };

  const handleEmailLogin = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(""); // Clear previous errors if validation passed
    const userData = { email, role: 'user' }; 
    login(userData);
    navigate('/dashboard');
  };

  const validateEmail = (email) => {
    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const toggleEmailLogin = () => setShowEmailLogin(!showEmailLogin);

  const handleSignUp = () => {
    // Navigate to the sign-up page or trigger a sign-up modal
    navigate('/signup'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-sm transition-transform duration-300">
        
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-4">Log in to CRM</h2>
        <p className="text-center text-gray-600 mb-8">Access your account</p>
        
        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => console.error("Google Login Failed")}
        />

        {/* Divider */}
        <div className="text-center my-4 text-gray-500">or</div>

        {/* Login with Email Toggle */}
        {!showEmailLogin ? (
          <button
            onClick={toggleEmailLogin}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login with Email
          </button>
        ) : (
          <div className="space-y-4">
            {/* Email Login Form */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleEmailLogin}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            
            {/* Forgot Password */}
            <div className="text-center mt-4">
              <button
                onClick={() => alert("Password reset feature coming soon!")}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleSignUp}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
