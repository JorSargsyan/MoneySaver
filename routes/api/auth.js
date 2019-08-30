const express = require("express");
const authMiddleware = require("../../middleware/auth");
const {check,validationResult}  = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");
const router = express.Router();

//@route        GET api/auth
//@desc         test
//@access       public
router.get("/",authMiddleware,( async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}))


//@route        POST api/auth
//@desc         authenticate user & get token
//@access       public

router.post("/",[
    [
        check("email","Please include a valid email").isEmail(),
        check('password','Password is required').exists().isLength({ min: 6 })
    ], (async (req,res)=>{
        const {email,password} = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        try {
            let user = await User.findOne({email});

            if(!user){
                return res.status(400).json({msg:"Invalid credentials"});
            }

            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({msg:"Invalid credentials"});
            }


            const encryptionData = {
                user:{
                    id:user.id,
                    role : user.role
                }
            }


            jwt.sign(encryptionData,config.get("jwtSecret"),{
                expiresIn:36000
            },(err,token)=>{
                if(err){
                    throw err;
                }
                else{
                    res.json({token});
                }
            })

        } catch (error) {
            console.error(err.message);
            res.status(500).send("Internal server error");
        }

    })
])


module.exports = router;
