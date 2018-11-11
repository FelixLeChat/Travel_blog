const express = require('express');
const models = require('../models');

const router = express.Router();
router.get('/themes', (req, res) => {
  models.User.findAll().then((themes) => {
    console.log(themes);
    res.json(themes);
  });
});

module.exports = router;
