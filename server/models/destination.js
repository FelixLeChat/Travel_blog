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
    continent: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  // Create default themes
  Destination.sync({ force: true }).then(() => Destination.bulkCreate([
    {
      id: 1,
      name: 'iceland',
      continent: 'europe',
      image: '',
    },
    {
      id: 2,
      name: 'portugal',
      continent: 'europe',
      image: '',
    },
    {
      id: 3,
      name: 'greece',
      continent: 'europe',
      image: '',
    },
    {
      id: 4,
      name: 'croatia',
      continent: 'europe',
      image: '',
    },
    {
      id: 5,
      name: 'holland',
      continent: 'europe',
      image: '',
    },
    {
      id: 6,
      name: 'denmark',
      continent: 'europe',
      image: '',
    },
    {
      id: 7,
      name: 'italy',
      continent: 'europe',
      image: '',
    },
    {
      id: 8,
      name: 'philippines',
      continent: 'asia',
      image: '',
    },
    {
      id: 9,
      name: 'vietnam',
      continent: 'asia',
      image: '',
    },
    {
      id: 10,
      name: 'argentina',
      continent: 'south_america',
      image: '',
    },
  ]));

  return Destination;
};
