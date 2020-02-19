const express = require('express');
const mongoose = require('mongoose');
var categories = require('./model/category.js');
const router = express.Router();

router.get("/category" , (req , res) => {
    res.send("daat list")

})