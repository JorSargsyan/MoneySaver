mongoose = require("mongoose");

const TransactionTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model("transactionType", TransactionTypeSchema);