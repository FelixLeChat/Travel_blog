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
    Theme.sync({ force: true }).then(() => Theme.bulkCreate([
      {
        id: 1,
        name: 'itineary',
        image: '',
      },
      {
        id: 2,
        name: 'guide',
        image: '',
      },
      {
        id: 3,
        name: 'top',
        image: '',
      },
      {
        id: 4,
        name: 'food',
        image: '',
      },
    ]));
  }

  return Theme;
};
