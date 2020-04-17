const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
var bodyParser = require('body-parser');
var assert = require('assert'); 


var mongoose = require('mongoose');


router.get('/NGO', (req, res) => res.render('NGO.hbs'));

router.post('/NGO', (req, res)  =>{
    const{id, database_name, document_type, document_URL, date_upload,date_update,service_id , chat_id } = req.body;
    let errors = [];
     
    //check require field
    if (!document_URL){
        errors.push({msg: 'fill in all field'});

    }
    if(errors.length>0){
        res.render('NGO.hbs', {
            errors,
            id,
            database_name,
            document_type,
            document_URL,
            date_upload,
            date_update,
            service_id,
            chat_id

        });

    }
    else{
       
    }

});   
module.exports = router;
    