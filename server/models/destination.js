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
    thumbnail: {
      type: DataTypes.STRING,
    },
  });

  // Create default themes
  if (process.env.NODE_ENV !== 'production') {
    Destination.sync({ force: true }).then(() => Destination.bulkCreate([
      {
        id: 1,
        name: 'iceland',
        continent: 'europe',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1542488893/Themes/Iceland.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489036/Themes/Iceland_thumbnail.jpg',
      },
      {
        id: 2,
        name: 'portugal',
        continent: 'europe',
        image:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489251/Themes/Portugal.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489250/Themes/Portugal_thumbnail.jpg',
      },
      {
        id: 3,
        name: 'greece',
        continent: 'europe',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489507/Themes/Greece.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489507/Themes/Greece_thumbnail.jpg',
      },
      {
        id: 4,
        name: 'croatia',
        continent: 'europe',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489685/Themes/Croatia.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1542489684/Themes/Croatia_thumbnail.jpg',
      },
      {
        id: 5,
        name: 'holland',
        continent: 'europe',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1542490053/Themes/Holland.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1542490052/Themes/Holland_thumbnail.jpg',
      },
      {
        id: 6,
        name: 'denmark',
        continent: 'europe',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1543073125/Themes/Denmark.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543073125/Themes/Denmark_thumbnail.jpg',
      },
      {
        id: 7,
        name: 'italy',
        continent: 'europe',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1543073568/Themes/Italy.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543073567/Themes/Italy_thumbnail.jpg',
      },
      {
        id: 8,
        name: 'philippines',
        continent: 'asia',
        image:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543074013/Themes/Philippines.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543074013/Themes/Philippines_thumbnail.jpg',
      },
      {
        id: 9,
        name: 'vietnam',
        continent: 'asia',
        image: 'https://res.cloudinary.com/heyjltyh0/image/upload/v1543074251/Themes/Vietnam.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543074251/Themes/Vietnam_thumbnail.jpg',
      },
      {
        id: 10,
        name: 'argentina',
        continent: 'south_america',
        image:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543074741/Themes/Argentina.jpg',
        thumbnail:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543074740/Themes/Argentina_thumbnail.jpg',
      },
    ]));
  }

  return Destination;
};
