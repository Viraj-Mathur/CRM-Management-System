const pool = require('../config/db'); // MySQL connection pool
const axios = require('axios'); // For internal API calls
const amqp = require('amqplib');

// Function to generate random delivery status (90% SENT, 10% FAILED)
const getRandomStatus = () => {
    return Math.random() < 0.9 ? 'SENT' : 'FAILED';
};

// Publish a message to the queue
const publishToQueue = async (queueName, message) => {
  try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
      console.log('Message published:', message);
      await channel.close();
      await connection.close();
  } catch (error) {
      console.error('Error publishing to queue:', error);
  }
};


// Controller to send campaign messages
exports.sendCampaignMessages = async (req, res) => {
  const { campaignId } = req.body;

  if (!campaignId) {
      return res.status(400).json({ error: 'Campaign ID is required' });
  }

  try {
      // Fetch campaign details
      const [campaign] = await pool.query('SELECT * FROM campaigns WHERE id = ?', [campaignId]);
      if (campaign.length === 0) {
          return res.status(404).json({ error: 'Campaign not found' });
      }
      const { customerId, message } = campaign[0];

      // Fetch customer details for the given campaign
      const [customers] = await pool.query('SELECT * FROM customers WHERE id = ?', [customerId]);
      if (customers.length === 0) {
          return res.status(404).json({ error: 'Customer not found for this campaign' });
      }

      // Send personalized messages and log them
      for (const customer of customers) {
          const personalizedMessage = message.replace('[Name]', customer.name);
          const [result] = await pool.query(
              `INSERT INTO message_logs (campaignId, customerId, message, status) VALUES (?, ?, ?, ?)`,
              [campaignId, customer.id, personalizedMessage, 'SENT'] // Set initial status to 'SENT'
          );

          const logId = result.insertId;

          // Call Delivery Receipt API to update status
        //   await axios.post(`http://localhost:3000/api/messages/delivery-receipt/${logId}`);
        await axios.post(`https://crm-management-system-1.onrender.com/api/messages/delivery-receipt/${logId}`);
      }

      res.status(200).json({ message: 'Messages sent and delivery statuses updated successfully' });
  } catch (error) {
      console.error('Error sending campaign messages:', error);
      res.status(500).json({ error: 'An error occurred while sending messages' });
  }
};


// Controller to update delivery status of a message
exports.updateDeliveryStatus = async (req, res) => {
    const { logId } = req.params;

    try {
        // Check if the message log exists
        const [existingLog] = await pool.query('SELECT * FROM message_logs WHERE id = ?', [logId]);
        if (existingLog.length === 0) {
            return res.status(404).json({ error: 'Message log not found' });
        }

        // Generate random status
        const status = getRandomStatus();

        // Publish logId and status to the queue
        await publishToQueue('delivery_status_updates', { logId, status });

        res.status(200).json({ message: 'Delivery status queued successfully', logId, status });
    } catch (error) {
        console.error('Error queuing delivery status:', error);
        res.status(500).json({ error: 'An error occurred while queuing delivery status' });
    }
};

// /controllers/messageController.js
exports.getMessageLogs = async (req, res) => {
  const { campaignId } = req.query; // Fetch campaignId from query parameters

  try {
      // Check if campaignId is provided
      if (!campaignId) {
          return res.status(400).json({ error: 'Campaign ID is required to fetch message logs' });
      }

      // Fetch message logs for the given campaignId
      const [logs] = await pool.query(
          'SELECT * FROM message_logs WHERE campaignId = ?',
          [campaignId]
      );

      // If no logs found, return an appropriate response
      if (logs.length === 0) {
          return res.status(404).json({ error: 'No message logs found for the specified campaign' });
      }

      // Return the fetched logs
      res.status(200).json(logs);
  } catch (error) {
      console.error('Error fetching message logs:', error);
      res.status(500).json({ error: 'An error occurred while fetching message logs' });
  }
};
