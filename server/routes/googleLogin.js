const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const connection = require('../config');

const client = new OAuth2Client('208114179115-ct1m9gm0dcnc4tmhtmecbcuipe77ncc7.apps.googleusercontent.com');

// Google login route handler
const googleLogin = async (req, res) => {
  const { token } = req.body;
  console.log('Received token from client:', token); // Log the received token

  try {
    // Verify the token using Google OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '208114179115-ct1m9gm0dcnc4tmhtmecbcuipe77ncc7.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    console.log('Payload from Google:', payload); // Log the payload

    const { sub: googleId, email, name } = payload;

    // Check if user already exists in the database
    connection.query('SELECT * FROM googleLogin WHERE googleId = ?', [googleId], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length > 0) {
        // User exists, return user data
        res.json(results[0]);
      } else {
        // User does not exist, insert new user
        connection.query(
          'INSERT INTO googleLogin (googleId, email, name) VALUES (?, ?, ?)',
          [googleId, email, name],
          (err, results) => {
            if (err) {
              console.error('Error inserting data into MySQL:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }
            res.json({ googleId, email, name });
          }
        );
      }
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(400).json({ error: 'Invalid Google token' });
  }
};

// Define routes
router.post('/auth/google', googleLogin);

module.exports = router;
