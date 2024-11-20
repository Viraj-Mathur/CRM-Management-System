const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

// User model or database (for demonstration purposes)
const users = []; // This would typically be your database

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: 'http://localhost:3000/auth/google/callback',
  callbackURL: 'https://crm-management-system-1.onrender.com/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would look up or create the user in your database
  let user = users.find(user => user.googleId === profile.id);
  if (!user) {
    user = {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
    };
    users.push(user);
  }
  return done(null, user);
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  const user = users.find(user => user.googleId === id);
  done(null, user);
});

module.exports = passport;
