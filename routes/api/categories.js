const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const TransactionType = require("../../models/TransactionType");
const Category = require("../../models/Category");
const router = express.Router();


//@route        POST api/categories
//@desc         add a new public category
//@access       public


router.post("/addPublic",[
    check("name","Name is required").not().isEmpty(),
    check("type","Please select transaction type").isString().not().isEmpty(),
],(async(req,res)=>{
    const errors = validationResult(req);
    let {name,type} = req.body;

    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
    }
    try {
        let transactiontype = await TransactionType.findOne({"name": type})

        if(!transactiontype){
            return res.status(400).json({msg:"Not valid transaction type"});
        }

        let category = new Category({
            name,
            transactionType: transactiontype
        })

        await category.save();

        res.json(category);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))


//@route        POST api/categories
//@desc         get all public categories
//@access       public




module.exports = router;