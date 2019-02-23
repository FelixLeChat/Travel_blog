/* eslint-disable no-unused-vars */
const images = require('../data/galleryImages');

module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    src: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    destination_id: {
      type: DataTypes.INTEGER,
    },
  });

  // Create default gallery
  if (process.env.NODE_ENV !== 'production') {
    // Gallery.sync({ force: true }).then(() => Gallery.bulkCreate(images));
  }

  return Gallery;
};
