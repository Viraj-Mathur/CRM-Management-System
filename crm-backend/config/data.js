const express = require('express');
const { check } = require('express-validator');
const { createCustomer, createOrder } = require('../controllers/dataController');

const router = express.Router();

// Route for adding a new customer
router.post('/customers', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('contact').isLength({ min: 10, max: 10 }).withMessage('Contact must be 10 digits')
], createCustomer);

// Route for adding a new order
router.post('/orders', [
  check('customerId').notEmpty().withMessage('Customer ID is required'),
  check('orderAmount').isNumeric().withMessage('Order amount must be a number'),
  check('orderDate').isISO8601().withMessage('Order date must be in ISO format')
], createOrder);

module.exports = router;
