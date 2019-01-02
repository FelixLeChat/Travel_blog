const express = require('express');
const cache = require('memory-cache');
const models = require('../models');

const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;

const router = express.Router();

// Get Destination details
router.get('/destination/:destination', (req, res) => {
  const destinationName = req.params.destination;
  const cacheKey = `destination_details_${destinationName}`;

  let result = cache.get(cacheKey);
  if (result) {
    // eslint-disable-next-line
    console.log(`Cache hit with : ${cacheKey}`);
    res.json(result);
  } else {
    models.Destination.findAll({
      limit: 1,
      where: {
        name: destinationName,
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
          result = {
            id: destination.id,
            destination: destination.name,
            hero: destination.image,
            articles,
          };

          // set cache
          cache.put(cacheKey, result, 7 * day);

          // send result
          res.json(result);
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  }
});

// Get Article
router.get('/article/:article', (req, res) => {
  const articleSlug = req.params.article;
  const cacheKey = `article_${articleSlug}`;

  let result = cache.get(cacheKey);
  if (result) {
    // eslint-disable-next-line
    console.log(`Cache hit with : ${cacheKey}`);
    res.json(result);
  } else {
    models.Article.findAll({
      limit: 1,
      where: {
        slug: articleSlug,
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
        result = {
          article,
        };

        // set cache
        cache.put(cacheKey, result, 7 * day);

        // send result
        res.json(result);
      } else {
        res.status(404).send('Not found');
      }
    });
  }
});

// Get home details
router.get('/home', (req, res) => {
  const cacheKey = 'home_details';

  let result = cache.get(cacheKey);
  if (result) {
    // eslint-disable-next-line
    console.log(`Cache hit with : ${cacheKey}`);
    res.json(result);
  } else {
    models.Article.findAll({
      attributes: [
        'id',
        'hero_article',
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
      result = {
        articles,
      };

      // set cache
      cache.put(cacheKey, result, 7 * day);

      // send result
      res.json(result);
    });
  }
});

// Get Themes
router.get('/themes', (req, res) => {
  const cacheKey = 'themes';

  let result = cache.get(cacheKey);
  if (result) {
    // eslint-disable-next-line
    console.log(`Cache hit with : ${cacheKey}`);
    res.json(result);
  } else {
    models.Theme.findAll({
      attributes: ['id', 'name'],
    }).then((themes) => {
      result = {
        themes,
      };

      // set cache
      cache.put(cacheKey, result, 7 * day);

      // send result
      res.json(result);
    });
  }
});

// Get Destinations
router.get('/destinations', (req, res) => {
  const cacheKey = 'destinations';

  let result = cache.get(cacheKey);
  if (result) {
    // eslint-disable-next-line
    console.log(`Cache hit with : ${cacheKey}`);
    res.json(result);
  } else {
    models.Destination.findAll({
      attributes: ['id', 'name', 'continent', 'thumbnail'],
    }).then((destinations) => {
      result = {
        destinations,
      };

      // set cache
      cache.put(cacheKey, result, 7 * day);

      // send result
      res.json(result);
    });
  }
});

module.exports = router;
