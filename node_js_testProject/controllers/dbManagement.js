// const {Sequelize} = require("sequelize")

// const sequelize = require("../util/database");

// exports.postCreateTable=async(req,res,next)=>{
//     try{

//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({
//             error:"table creation failed",
//         })
//     }
// }

const createDynamicModel = require("../models/dbManagement");

exports.postCreateTable = async (req, res, next) => {
  const { tableName, fieldName, fieldType, ...additionalFields } = req.body;

  try {
    const columns = [{ name: fieldName, type: fieldType }];

    // Collect additional fields added dynamically
    for (let i = 1; i <= Object.keys(additionalFields).length / 2; i++) {
      columns.push({
        name: additionalFields[`fieldName${i}`],
        type: additionalFields[`fieldType${i}`],
      });
    }

    // Create the table using Sequelize
    const DynamicModel = createDynamicModel(tableName, columns);
    await DynamicModel.sync({ force: true });

    res
      .status(200)
      .json({ message: `Table '${tableName}' created successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the table." });
  }
};

exports.getTableData = async (req, res, next) => {
  const tableName = req.query.tableName;

  console.log("getTableControlTableName", tableName);

  try {
    const dynamicModel = createDynamicModel(tableName);

    const tableDescription = await dynamicModel.describe();

    
    // const tableData = await dynamicModel.findAll();

    res
      .status(200)
      .json({
        message: `Data retrieved successfully.`,
        columns: tableDescription,
        // data: tableData,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Failed to retrieve data from table '${tableName}'.` });
  }
};

