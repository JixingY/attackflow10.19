'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annotations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Annotations.init({
    tags: DataTypes.STRING,
    user: DataTypes.STRING,
    document: DataTypes.STRING,
    referenced_text : DataTypes.STRING,
    document_no : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Annotations',
  });
  return Annotations;
};