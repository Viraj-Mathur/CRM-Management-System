const pool = require('../config/db');

// Campaign table schema (run in MySQL to create the table)
const createCampaignTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      customerId INT NOT NULL,
      message TEXT NOT NULL,
      ScheduleTime DATE,
      FOREIGN KEY (customerId) REFERENCES customers(id)
    );
  `);
};

module.exports = createCampaignTable;
