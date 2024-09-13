const express = require("express");

const dbManagementController = require("../controllers/dbManagement");

const router = express.Router();

router.post("/createNewTable",dbManagementController.postCreateTable);

router.get("/tableDetails",dbManagementController.getTableData);

module.exports= router;