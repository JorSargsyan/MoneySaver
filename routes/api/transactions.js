const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const auth = require("../../middleware/auth")
const Category = require("../../models/Category");
const TransactionType = require("../../models/TransactionType");
const router = express.Router();


//@route        POST api/transactions
//@desc         add a new transaction
//@access       private


router.post("/",[
    auth,
    [check("amount","Please enter valid amount").isNumeric().not().isEmpty(),
    check("category","Please enter valid category").isString().not().isEmpty(),
    check("type","Please enter valid type").isString().not().isEmpty()
    ]
],(async(req,res)=>{
    const errors = validationResult(req);
    let {note,category,type} = req.body;

    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
    }
    try {
        let user = await User.findById(req.user.id);
        let selectedcategory = await Category.findOne({"name":category});
        let transactionType = await TransactionType.findOne({"name":type});

        const newTransaction = new TransactionType({
            user : req.user.id,
            amount : amount,
            note : note,
            categoryId : selectedcategory._id,
            transactionTypeId : transactionType._id
        })

     
        await newTransaction.save();

        res.json(newTransaction);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))




module.exports = router;