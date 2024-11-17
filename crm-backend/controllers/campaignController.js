const pool = require('../config/db');


// Create a new campaign
exports.createCampaign = async (req, res) => {
  const { name, customerId, message, scheduleTime } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO campaigns (name, customerId, message, ScheduleTime) VALUES (?, ?, ?, ?)',
      [name, customerId, message, scheduleTime]
    );
    res.status(201).json({ message: 'Campaign created successfully', campaignId: result.insertId });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'An error occurred while creating the campaign' });
  }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const [campaigns] = await pool.query('SELECT * FROM campaigns');
    res.json(campaigns);
  } catch (error) {
    console.error('Error retrieving campaigns:', error);
    res.status(500).json({ error: 'An error occurred while retrieving campaigns' });
  }
};

// Get a specific campaign by ID
exports.getCampaignById = async (req, res) => {
  const { id } = req.params;

  try {
    const [campaigns] = await pool.query('SELECT * FROM campaigns WHERE id = ?', [id]);
    if (campaigns.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaigns[0]);
  } catch (error) {
    console.error('Error retrieving campaign:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the campaign' });
  }
};

// Update a campaign by ID
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { name, customerId, message, scheduleTime } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE campaigns SET name = ?, customerId = ?, message = ?, ScheduleTime = ? WHERE id = ?',
      [name, customerId, message, scheduleTime, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign updated successfully' });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'An error occurred while updating the campaign' });
  }
};

// Controller to delete a campaign by ID
exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await pool.query('DELETE FROM campaigns WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'An error occurred while deleting the campaign' });
  }
};
