module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
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
  ]));
  return Theme;
};
