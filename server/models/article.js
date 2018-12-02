// const Theme = require('./theme');

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    theme_id: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Theme,
      //   key: 'id',
      //   deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE,
      // },
    },
    destination_id: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    top_title: {
      type: DataTypes.STRING,
    },
    top_items: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    language: {
      type: DataTypes.STRING,
    },
    published_at: DataTypes.DATE,
  });

  if (process.env.NODE_ENV !== 'production') {
    Article.sync({ force: true }).then(() => Article.bulkCreate([
      {
        id: 1,
        title: 'The Lopapeysa',
        slug: 'the-lopapeysa',
        image:
            'https://res.cloudinary.com/heyjltyh0/image/upload/v1543702414/Articles/The_lopapeysa.jpg',
        thumbnail: '',
        theme_id: 2,
        destination_id: 1,
        content:
            'This is the traditional wool sweater that you will find all over from Iceland. They are easy to spot by their distinct decorative patterns around the neck opening. Whether you are a local or a tourist, everyone wear them proudly in the streets of Reykjavik or in the many trails of this peaceful island.<br/><br/>The Icelandic name Lopapeysa is a literal translation of "wool sweater" ("lopa"=wool, "peysa"=sweater) and not from your average wool. The unique breed of sheep, native from Iceland and protected from centuries of isolation, from where the wool is make these sweater uniques! It will keep you warm whatever the weather.<br/><br/>As their popularity grew, more variety began to appear in stores all over the country. If you want to find the original Lopapeysa, here are some tips that may help you:',
        published_at: new Date(2018, 11, 1),
        language: 'en',
        top_title: 'Things to look to find the original Lopapeysa:',
        top_items: [
          'Watch out the tags! If you find the indication “Designed in Iceland” it may not be either hand made in Iceland or contain Icelandic wool.',
          'Natural colors. The naturals colors are shades of grey, black white or brown/beige. If you find a Lopapeysa with other colors, they are likely dyed.',
          'Price! A hand made Lopapeysa with Icelandic wool is expensive. It will likely set you back 250-350$ (CAD). If you find a much lower price, it can be made elsewhere or from lower quality materials.',
          'Check for the decorative neck patterns. If do not have those, you probably won’t have a Lopapeysa sweater.',
          'Symmetry! This is mostly if you want a hand knitted one. They usually are symmetrical (no difference between the front and the back), by the way they are knitted.',
        ],
      },
    ]));
  }
  return Article;
};
