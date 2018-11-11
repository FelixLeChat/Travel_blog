const express = require('express');
const models = require('../models');

const router = express.Router();

// Get home Themes and Destinations
router.get('/home', (req, res) => {
  models.Theme.findAll().then((themes) => {
    models.Destination.findAll().then((destinations) => {
      res.json({
        themes,
        destinations,
      });
    });
  });
});

module.exports = router;
