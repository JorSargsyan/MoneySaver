mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    amount:{
        type:Number,
        required:true
    },
    note :{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    transactionType : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "transactionType"
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("transaction",TransactionSchema);