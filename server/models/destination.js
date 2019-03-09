/* eslint-disable no-unused-vars */
const destinations = require('../data/destinations');

module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define('Destination', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    continent: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  });

  // Create default destinations
  if (process.env.NODE_ENV !== 'production') {
    // Destination.sync({ force: true }).then(() => Destination.bulkCreate(destinations));
  }

  return Destination;
};
