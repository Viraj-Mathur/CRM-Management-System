const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id; // Save user ID for the next middleware
    next();
  });
};

// Middleware to check if the user has a specific role
const isAuthorized = (role) => {
  return (req, res, next) => {
    const userRole = req.userRole || 'user'; // Fetch user role from DB or session (mocked here as 'user')
    if (userRole !== role) return res.status(403).json({ message: 'Forbidden: Access denied' });
    next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
