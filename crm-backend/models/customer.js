const pool = require('../config/db');

const createCustomerTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      total_spent DECIMAL(10, 2) DEFAULT 0,
      last_visit DATE,
      visits INT DEFAULT 0,
      segment VARCHAR(50) DEFAULT NULL
    );
  `);
};

module.exports = createCustomerTable;
