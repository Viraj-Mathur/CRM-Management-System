const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Route to initiate Google OAuth with required scopes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'] // Request profile and email data
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: req.user.googleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  }
);

module.exports = router;
