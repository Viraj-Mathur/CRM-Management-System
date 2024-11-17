const express = require('express');

const { updateDeliveryStatus, sendCampaignMessages, getMessageLogs } = require('../controllers/messageController');

const router = express.Router();

// Route to update delivery status for a message
router.post('/delivery-receipt/:logId', updateDeliveryStatus);

// Route to send messages for a campaign
router.post('/send', sendCampaignMessages);

// Route to fetch message logs for a specific campaign
router.get('/logs', getMessageLogs);

module.exports = router;

