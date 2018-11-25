const express = require('express');
const models = require('../models');

const router = express.Router();

// Get Destinations
router.get('/destinations', (req, res) => {
  models.Destination.findAll({
    attributes: ['name', 'continent', 'thumbnail'],
  }).then((destinations) => {
    res.json({
      destinations,
    });
  });
});

// Get Destination details
router.get('/destination/:destination', (req, res) => {
  models.Destination.findAll({
    limit: 10,
    where: {
      name: req.params.destination,
    },
    attributes: ['name', 'image'],
  }).then((destination) => {
    if (destination && destination.length === 1) {
      res.json({
        destination: destination[0].name,
        hero: destination[0].image,
      });
    } else {
      res.status(404).send('Not found');
    }
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
