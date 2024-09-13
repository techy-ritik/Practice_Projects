const {Sequelize}=require('sequelize');

const {AbstractDialect}=require('sequelize/lib/dialects/abstract/index');

const sequelize = new Sequelize("nodeJsTestProject","root","ritikesh1113",{
    dialect:"mysql",
    host:"localhost",
})

module.exports=sequelize;

