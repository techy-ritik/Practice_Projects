const Xpense = require("../models/expense");


exports.postAddExpense=async(req,res,next)=>{
    try{
        const amount= req.body.amount;
        const descrep= req.body.description;
        const category = req.body.category;

        const data = await Xpense.create({
            amount : amount,
            descrp : descrep,
            categry : category,
        })
        res.status(201).json({
            newExpense : data,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            error:"expense input failed",
        })
    }
}

exports.getAddExpense=async(req,res,next)=>{
    const allExpenses = await Xpense.findAll();
    res.status(200).json({allExpense : allExpenses})
}

exports.deleteExpenseDetails=async(req,res,next)=>{
    try{
        const deleteId=req.params.id;

        if(!deleteId){
            console.log("id is missing");
            res.status(400).json({error:"id is missing"});
        }
        // console.log("deleteId", deleteId);
        await Xpense.destroy({where : {id : deleteId}});
        res.sendStatus(200)
    }catch(err){
        console.log("deletion failed",err);
        res.status(500).json({error:"user deletion failed"})
    }
}


