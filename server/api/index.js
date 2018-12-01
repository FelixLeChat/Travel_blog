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
    limit: 1,
    where: {
      name: req.params.destination,
    },
    attributes: ['id', 'name', 'image'],
  }).then((destinations) => {
    if (destinations && destinations.length === 1) {
      const destination = destinations[0];

      // Find articles for the destination
      models.Article.findAll({
        limit: 10,
        where: {
          destination_id: destination.id,
        },
        attributes: ['id', 'image', 'title', 'content', 'theme_id', 'destination_id'],
      }).then((articles) => {
        res.json({
          id: destination.id,
          destination: destination.name,
          hero: destination.image,
          articles: articles.map(article => ({
            id: article.id,
            title: article.title,
            image: article.image,
          })),
        });
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
