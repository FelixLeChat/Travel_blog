/* eslint-disable no-unused-vars */
const articles = require('../data/articles');

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    hero_article: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
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
    },
    destination_id: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
    bottom_content: {
      type: DataTypes.TEXT,
    },
    top_titles: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    top_contents: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    top_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    top_list_title: {
      type: DataTypes.STRING,
    },
    top_list_link: {
      type: DataTypes.STRING,
    },
    top_list_items: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    top_list_images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    published_at: DataTypes.DATE,
  });

  if (process.env.NODE_ENV !== 'production') {
    // Article.sync({ force: true }).then(() => Article.bulkCreate(articles));
  }
  return Article;
};
