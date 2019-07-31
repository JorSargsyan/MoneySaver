mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    note :{
        type:String
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    transactionTypeId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "transactionTypes"
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("transaction",TransactionSchema);