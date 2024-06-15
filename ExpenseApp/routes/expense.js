const path = require('path');

const express = require("express");

const expenseController = require("../controllers/expense");

const router= express.Router();

router.post("/add-expense",expenseController.postAddExpense);

router.get("/add-expense",expenseController.getAddExpense);

router.delete("/delete-expense/:id",expenseController.deleteExpenseDetails);

module.exports = router;