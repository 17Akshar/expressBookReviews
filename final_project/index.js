const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"access",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if(req.session.accessToken){
        var token = req.session.accessToken //getting token from req header
    
        console.log("token",token)
        try{
        var decoded = jwt.verify(token,'access')
        var username = decoded.data
        req.user = username
        next()
        }
        catch(err){
        res.status(403).json({message:"invalid token"})    

        }
    }
    else{
        res.status(403).json({message:"no token found"})    
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on port 5000"));
