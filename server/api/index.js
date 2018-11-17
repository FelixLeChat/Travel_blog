const express = require('express');
const models = require('../models');

const router = express.Router();

// Get Destinations
router.get('/destinations', (req, res) => {
  models.Destination.findAll().then((destinations) => {
    res.json({
      destinations,
    });
  });
});

// Get Themes
router.get('/themes', (req, res) => {
  models.Theme.findAll().then((themes) => {
    res.json({
      themes,
    });
  });
});

module.exports = router;
