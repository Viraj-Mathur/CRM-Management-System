const pool = require('../config/db');

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const [customers] = await pool.query('SELECT * FROM customers');
    res.json(customers);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    res.status(500).json({ error: 'An error occurred while retrieving customers' });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const [customers] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
    if (customers.length === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json(customers[0]);
  } catch (error) {
    console.error('Error retrieving customer:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the customer' });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  const { name, email, total_spent, last_visit, visits, segment } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO customers (name, email, total_spent, last_visit, visits, segment) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, total_spent, last_visit, visits, segment]
    );
    res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'An error occurred while creating the customer' });
  }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, total_spent, last_visit, visits, segment } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE customers SET name = ?, email = ?, total_spent = ?, last_visit = ?, visits = ?, segment = ? WHERE id = ?',
      [name, email, total_spent, last_visit, visits, segment, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'An error occurred while updating the customer' });
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM customers WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'An error occurred while deleting the customer' });
  }
};
