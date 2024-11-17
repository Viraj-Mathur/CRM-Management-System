// /routes/campaign.js
const express = require('express');
const { createCampaign, getCampaigns, getCampaignById, deleteCampaign } = require('../controllers/campaignController');

const router = express.Router();

// Route to create a new campaign
router.post('/', createCampaign);

// Route to get all campaigns
router.get('/', getCampaigns);

// Route to get a specific campaign by ID
router.get('/:id', getCampaignById);

// Route to delete a specific campaign by ID
router.delete('/:id', deleteCampaign);

module.exports = router;
