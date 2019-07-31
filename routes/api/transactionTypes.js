const express = require("express");
const { check, validationResult } = require("express-validator");
const TransactionType = require("../../models/TransactionType");
const router = express.Router();


//@route        POST api/transactionTypes
//@desc         add a new transactionType
//@access       public


router.post("/",[
    check("name","Name is required").not().isEmpty()
],(async(req,res)=>{
    const errors = validationResult(req);
    const {name} = req.body;

    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
    }
    
    try {
        
        let transactionType = new TransactionType({
            name
        })

        await transactionType.save();

        res.json(transactionType);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))




module.exports = router;