const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const TransactionType = require("../../models/TransactionType");
const Category = require("../../models/Category");
const router = express.Router();
const auth = require("../../middleware/auth")
const superAdmin = require("../../middleware/superAdmin")

//@route        POST api/categories
//@desc         add a new public category
//@access       public


router.post("/addPublicCategory",[
    auth,superAdmin,
    [ check("name","Name is required").not().isEmpty(),
    check("type","Please select transaction type").isString().not().isEmpty(),]
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

        let category = await Category.findOne({$or : [{[transactiontype.name]:type},{name : name}]});
        if(category){
            return res.status(400).json({msg:"Not valid Category name"});
        }

        let Newcategory = new Category({
            name,
            transactionType: transactiontype,
        })

        await Newcategory.save();

        let CategoriesPublicList = await Category.find({isPublic : true}).populate("transactionType", ['name']);
        let CategoriesByIdList = await Category.find({user : req.user.id}).populate("transactionType", ['name']);
        let result = [...CategoriesPublicList,...CategoriesByIdList];

        res.send(result);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))



//@route        POST api/categories
//@desc         add a new public category
//@access       public

router.post("/addCustomCategory",auth,[
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

        let categoryCustomCheck = await Category.findOne({name : name,user : req.user.id});
        let categoryPublicCheck = await Category.findOne({isPublic : true,name : name});
        if(categoryCustomCheck || categoryPublicCheck){
            return res.status(400).json({msg:"Not valid Category name"});
        }

        let Newcategory = new Category({
            name,
            transactionType: transactiontype,
            user : req.user.id,
            isPublic: false
        })

        await Newcategory.save();

        let CategoriesPublicList = await Category.find({isPublic : true}).populate("transactionType", ['name']);
        let CategoriesByIdList = await Category.find({user : req.user.id}).populate("transactionType", ['name']);
        let result = [...CategoriesPublicList,...CategoriesByIdList];

        res.send(result);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))


//@route        POST api/categories
//@desc         get all public categories
//@access       public
router.get("/getAllCategoriesById",auth,async(req,res)=>{
    try {
        let result;
       
        let CategoriesPublicList = await Category.find({isPublic : true}).populate("transactionType", ['name']);
        let CategoriesByIdList = await Category.find({user : req.user.id}).populate("transactionType", ['name']);
        result = [...CategoriesPublicList,...CategoriesByIdList];
   
        res.json(result);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})



module.exports = router;