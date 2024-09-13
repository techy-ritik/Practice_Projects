const Sequelize= require('sequelize');

const sequelize= require("../util/database");

// const newTable = Sequelize.cre;

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

const createDynamicModel = (tableName, columns) => {
  const attributes = {};

  if(columns){
    columns.forEach((column) => {
      attributes[column.name] = { type: Sequelize[column.type.toUpperCase()] };
    });
  }
  

  const DynamicModel = sequelize.define(tableName, attributes, {
    tableName,
    timestamps: false,
  });

  return DynamicModel;
};

module.exports = createDynamicModel;
