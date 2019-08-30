const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const router = express.Router();



//@route        POST api/users
//@desc         register new user
//@access       public


router.post("/", [
    check("name", "Name field is required").not().isEmpty(),
    check("email", "Email field is required").isEmail(),
    check("password", "Password should be not less than 6 characters.").isLength({ min: 6 })
], (async (req, res) => {
    const errors = validationResult(req);
    const { email, password, name, role } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ "email": email });

        if (user) {
            return res.status(400).json({ errors: { msg: "User already exists" } });
        }

        if (role == "superAdmin") {
            user = new User({
                name, email, password, role
            })
        }
        else{
            user = new User({
                name, email, password
            })
        }
      

        //encrypt a password using bcrypt

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ msg: "You are succesfully registered,and now you can try to sign in" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))


module.exports = router;