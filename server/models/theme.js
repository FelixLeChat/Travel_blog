module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameFr: {
      type: DataTypes.STRING,
    },
    nameEN: {
      type: DataTypes.STRING,
    },
  });
  return Theme;
};
