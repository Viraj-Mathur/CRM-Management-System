require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport'); // Passport configuration for Google OAuth
const customerRoutes = require('./routes/customers'); // Routes for customer management
const authRoutes = require('./routes/auth'); // Authentication routes
const campaignRoutes = require('./routes/campaign'); // Campaign management routes
const messageRoutes = require('./routes/messageRoutes'); // Message delivery routes
const pool = require('./config/db'); // Database connection setup

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with the appropriate origin
app.use(cors({ origin: 'http://localhost:3001' })); // Adjust if the frontend runs on a different port

// Log environment variables for debugging purposes
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

// Middleware to parse JSON data
app.use(express.json());

// Session middleware configuration
app.use(session({
  secret: process.env.JWT_SECRET, // Use JWT secret for sessions
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Immediate asynchronous function to test database connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Endpoint to test database connection on demand
app.get('/test-db', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Database connection successful!', result: result[0].solution });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Routes setup
app.use('/auth', authRoutes);                // Authentication routes
app.use('/api/customers', customerRoutes);   // Customer management routes
app.use('/api/campaigns', campaignRoutes);   // Campaign management routes
app.use('/api/messages', messageRoutes);     // Message delivery and status update routes

// Root endpoint for quick testing
app.get('/', (req, res) => {
  res.send('Welcome to the CRM backend API');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
