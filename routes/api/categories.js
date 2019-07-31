const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const TransactionType = require("../../models/TransactionType");

const router = express.Router();


//@route        POST api/categories
//@desc         add a new public category
//@access       public


// router.post("/addPublic",[
//     check("name","Name is required").not().isEmpty(),
//     check("name","Please select transaction type").not().isEmpty(),
// ],(async(req,res)=>{
//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(500).json({errors:errors.array()});
//     }
//     try {
        
//         let category = new category({

//         })
//     } catch (error) {
        
//     }
// }))




