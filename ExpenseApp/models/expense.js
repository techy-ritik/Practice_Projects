const Sequelize = require('sequelize');

const sequelize = require("../util/database");

const Xpense = sequelize.define("xpns",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey : true
    },
    amount :{
        type : Sequelize.DOUBLE,
    },
    descrp:{
        type: Sequelize.STRING,
    },
    categry: Sequelize.STRING
})

module.exports = Xpense;