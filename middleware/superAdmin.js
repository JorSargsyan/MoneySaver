const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = function(req,res,next){
    //Get token from header
    const token = req.header("x-auth-token");

    //Check if no token

    if(!token){
        return res.status(401).json({msg: "No token,authorization denied!"});
    }

    try {
        const decoded = jwt.verify(token,config.get("jwtSecret"));

        req.user = decoded.user;
        //check the user role
        if(req.user.role != "superAdmin"){
            res.status(401).json({msg: "Permission Denied!"});
        }
        next();
    } catch (error) {
        res.status(401).json({msg : "Token is not valid"});
    }
}