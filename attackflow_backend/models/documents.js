'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Documents.init({
    document_name: DataTypes.STRING,
    version_number: DataTypes.STRING,
    content: DataTypes.STRING,
    uploader_id : DataTypes.STRING,
    is_accepted : DataTypes.STRING,
    path : DataTypes.STRING,
    document_no : DataTypes.STRING,
    status : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};