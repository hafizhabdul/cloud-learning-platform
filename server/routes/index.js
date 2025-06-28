const express = require('express');
const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
router.use('/auth', authRoutes);

// Dashboard routes
router.use('/dashboard', dashboardRoutes);

module.exports = router;
