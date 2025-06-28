const express = require('express');
const passport = require('../config/passport');
const AuthController = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Local authentication routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticate, AuthController.profile);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/auth/google/failure',
    session: false 
  }),
  AuthController.googleCallback
);

router.get('/google/failure', AuthController.googleFailure);

module.exports = router;
