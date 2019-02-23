/* eslint-disable no-unused-vars */
const themes = require('../data/themes');

module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  // Create default themes
  if (process.env.NODE_ENV !== 'production') {
    // Theme.sync({ force: true }).then(() => Theme.bulkCreate(themes));
  }

  return Theme;
};
