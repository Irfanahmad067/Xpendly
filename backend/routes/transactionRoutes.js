const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')
const moment = require('moment')

router.post("/add-transaction", async (req, res) => {
  
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async (req, res) => {
  try {
    await Transaction.findOneAndUpdate({_id : req.body.transactionId}, req.body.payload);
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete-transaction", async (req, res) => {
  try {
    await Transaction.findOneAndDelete(
      { _id: req.body.transactionId },
    );
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/get-all-transactions", async (req, res) => {
  const {frequency, selectedRange, type} = req.body
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom" ? {                             ////...() is used for write the condition in one line any object
        date: {
          $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
        },
      }:{
        date: {
          $gte: selectedRange[0],
          $lte: selectedRange[1]
        }
      }),
      
      userId: req.body.userId,
      ...(type!=="all" && {type}),

    });
    res.send(transactions);
  } catch (error) {
    console.log("error_backend", error)
    res.status(500).json(error);
  }
});

module.exports = router;