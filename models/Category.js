mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refs: "users"
    },
    icon:{
        type:String,
    },
    transactionTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "transactiontypes",
        required:true,
    },
    parentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"categories",
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