const express  = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
connectDB();

//init Middleware
app.use(express.json({extended:false}));


//init routes
app.use("/api/users",require("./routes/api/users"));
app.use("/api/auth",require("./routes/api/auth"));
// app.use("/api/transactions",require("./routes/api/transactions"));
// app.use("/api/categories",require("./routes/api/categories"));



if(process.env.NODE_ENV === 'production'){
    //set Static folder

    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT = process.env.port || 4000;


app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})


app.get("/",((req,res)=>{
    res.send("API IS RUNNING");
}))