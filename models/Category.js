mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    icon:{
        type:String,
    },
    transactionType:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "transactiontype",
        required:true,
    },
    parentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category",
        default:null
    },
    creationDate : {
        type:Date,
        default:Date.now
    },
    updatedDate : {
        type:Date
    }
})

module.exports = mongoose.model("category",CategorySchema);