const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs')
// const bcrypt =  require('bcryptjs');


router.get('/login', (req, res) => res.send('login'));
router.get('/register', (req, res) => res.send('register'));

// router.get('/dashboard/category' , function(req,res){
//     categories.find({parent_id} , function(err , docs){
//       if(err) res.json(err);
//       else res.render('category',{categories:docs})
//     });
//   });



module.exports = router;