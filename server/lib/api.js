const express = require('express');

module.exports = (sequelize) => {
  const router = express.Router();

  // Wrap an async function so we catch any errors that might occur
  const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }));

  // Get all books
  // router.get(
  //   '/',
  //   wrapAsync(async req => db
  //     .collection('Book')
  //     .find()
  //     .sort({ createdAt: -1 })
  //     .toArray()),
  // );

  return router;
};
