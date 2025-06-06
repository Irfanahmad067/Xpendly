const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    reference: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
})

const transactionModel = mongoose.model("Transactions", transactionSchema); 

module.exports = transactionModel;