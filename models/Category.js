mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    icon:{
        type:String,
    },
    transactionTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    parentId : {
        type: mongoose.Schema.Types.ObjectId,
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