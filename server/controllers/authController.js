const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

class AuthController {
  // Register new user
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          error: 'User with this email already exists'
        });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,
        provider: 'local'
      });

      // Generate token
      const token = generateToken({ id: user.id, email: user.email });

      res.status(201).json({
        message: 'User registered successfully',
        user: user.toJSON(),
        token
      });
    } catch (error) {
      next(error);
    }
  }

  // Login user
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          error: 'Invalid email or password'
        });
      }

      // Check if user uses OAuth
      if (user.provider !== 'local') {
        return res.status(400).json({
          error: 'Please use Google login for this account'
        });
      }

      // Check password
      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Invalid email or password'
        });
      }

      // Generate token
      const token = generateToken({ id: user.id, email: user.email });

      res.json({
        message: 'Login successful',
        user: user.toJSON(),
        token
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current user profile
  static async profile(req, res, next) {
    try {
      res.json({
        user: req.user.toJSON()
      });
    } catch (error) {
      next(error);
    }
  }

  // Google OAuth success callback
  static async googleCallback(req, res, next) {
    try {
      const user = req.user;
      const token = generateToken({ id: user.id, email: user.email });

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (error) {
      next(error);
    }
  }

  // Google OAuth failure callback
  static async googleFailure(req, res) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/failure`);
  }
}

module.exports = AuthController;
