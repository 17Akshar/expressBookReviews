const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const session = require('express-session')
const regd_users = express.Router();

let users = [
  { id: 1, username: 'akshar', password: '123' },
  { id: 2, username: 'Rohan', password: '456' },
];
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  var user = users.filter((user)=> {return user.username === username && user.password === password})
  if(user.length>0){
    //user credentials matched
    return true
  }
  else{
    //user not exits
    return false
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  var {username,password}=req.body
  if(username && password){
  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({data:username}, 'access',{expiresIn:'1h'}); //secret key = access
    req.session.accessToken = accessToken

    return res.status(200).json({message:"User successfully logged in",token:accessToken});
  }
  else{
    return res.status(208).json({message: "Invalid Login"});
  }}
  else{
    return res.status(208).json({message: "Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  var review = req.body.review
  var isbn = req.params.isbn
  var username = req.user
  console.log(review,isbn,username)
  var book = books[isbn]

  console.log(book)
  if(username){
    if(book.reviews[username]){
      book.reviews[username]=review
      return res.status(200).json({message:"review updated successfully!"})
    }
    else{
      book.reviews[username]=review
      return res.status(200).json({message:"review added successfully!"})
    }
  }
});

regd_users.delete('/auth/review/:isbn',(req,res)=>{
  var username = req.user
  var isbn = req.params.isbn
  var book = books[isbn]
  if(!book){
    return res.status(403).json({message:"no book exits"})
  }
  if(!book.reviews[username]){
    return res.status(403).json({message:"no review exits"})
  }
  delete book.reviews[username]
  return res.status(200).json({message:"review deleted successully!"})
})
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
