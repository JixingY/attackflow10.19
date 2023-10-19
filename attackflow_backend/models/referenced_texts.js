'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referenced_texts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Referenced_texts.init({
    referenced_text: DataTypes.STRING,
    document: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Referenced_texts',
  });
  return Referenced_texts;
};