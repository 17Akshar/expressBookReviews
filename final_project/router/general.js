const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();

function exists(username) {
  var user_check = users.filter((user)=>{
    return user.username===username
  })
  if(user_check.length>0){
    return true
  }
  else{
    return false
  }
}


public_users.post("/register", (req,res) => {
  var username = req.body.username
  var password = req.body.password
  if(username && password){
    if(!exists(username)){
      users.push({"username":username,"password":password})
      return res.status(200).json({message:"user added successfully!"})
    }
    else{
      return res.status(404).json({message:"user already exists"})
    }
  }
  else{
    return res.status(404).json({message:"invalid credentials"})

  }
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try{
      var response = await axios.get(URL_TO_GET_BOOK)
      var books = response.data
      res.status(200).json(books)
    } 
    catch(err){
      res.status(203).json({message:"failed to fetch!",error:err.message})
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  try{
    var reponse = await axios.get(URL/isbn)
    var books = reponse.data
    res.status(200).json(books[isbn])

  }catch(err){
    res.status(203).json({message:"failed to fetch!",error:err.message})

  }
  // var isbn = req.params.isbn
  // res.send([books[isbn]])
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  try{
    var reponse = await axios.get(URL/author)
    var books = reponse.data
    res.status(200).json(books[author])

  }catch(err){
    res.status(203).json({message:"failed to fetch!",error:err.message})

  }
  // var isbns = Object.keys(books)
  // var author = req.params.author
  // var book = isbns.filter((isbn)=>{
  //   if(author == books[isbn].author){
  //     res.send(books[isbn])
  //   }
  // })
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  try{
    var reponse = await axios.get(URL/title)
    var books = reponse.data
    res.status(200).json(books[title])

  }catch(err){
    res.status(203).json({message:"failed to fetch!",error:err.message})

  }
  // var isbns = Object.keys(books)
  // var title = req.params.title
  // var book = isbns.filter((isbn)=>{
  //   if(title == books[isbn].title){
  //     res.send(books[isbn])
  //   }
  // })
  //  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  var isbn = req.params.isbn
  res.send(books[isbn].reviews)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
