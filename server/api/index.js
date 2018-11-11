const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/themes', (req, res) => {
  models.theme.findAll().then((themes) => {
    res.json(themes);
  });
});

router.get('/destinations', (req, res) => {
  models.destination.findAll().then((destination) => {
    res.json(destination);
  });
});

module.exports = router;
