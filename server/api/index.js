const express = require('express');
const models = require('../models');

const router = express.Router();

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
        attributes: [
          'id',
          'image',
          'thumbnail',
          'title',
          'content',
          'theme_id',
          'destination_id',
          'published_at',
          'slug',
        ],
      }).then((articles) => {
        res.json({
          id: destination.id,
          destination: destination.name,
          hero: destination.image,
          articles,
        });
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

// Get Article
router.get('/article/:article', (req, res) => {
  models.Article.findAll({
    limit: 1,
    where: {
      slug: req.params.article,
    },
    attributes: [
      'id',
      'image',
      'thumbnail',
      'title',
      'description',
      'content',
      'bottom_content',
      'theme_id',
      'destination_id',
      'published_at',
      'slug',
      'top_titles',
      'top_contents',
      'top_images',
      'top_list_title',
      'top_list_items',
      'top_list_images',
    ],
  }).then((articles) => {
    if (articles && articles.length === 1) {
      const article = articles[0];
      res.json({
        article,
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

// Get home details
router.get('/home', (req, res) => {
  models.Article.findAll({
    attributes: [
      'id',
      'image',
      'thumbnail',
      'title',
      'content',
      'theme_id',
      'destination_id',
      'published_at',
      'slug',
    ],
  }).then((articles) => {
    res.json({
      articles,
    });
  });
});

// Get Themes
router.get('/themes', (req, res) => {
  models.Theme.findAll({
    attributes: ['id', 'name'],
  }).then((themes) => {
    res.json({
      themes,
    });
  });
});

// Get Destinations
router.get('/destinations', (req, res) => {
  models.Destination.findAll({
    attributes: ['id', 'name', 'continent', 'thumbnail'],
  }).then((destinations) => {
    res.json({
      destinations,
    });
  });
});

module.exports = router;
