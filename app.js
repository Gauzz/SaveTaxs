var http = require('http');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const flash = require('connect-flash');
// const session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fs = require('fs')
const handlebars = require("express-handlebars");

var app = express();

var categories = require('./models/category.js');
var chat = require('./models/chat.js');
var notification = require('./models/notification.js');
var order = require('./models/order.js');
var orderHistory = require('./models/orderHistory.js');
var payment = require('./models/payment.js');
var paymentHistory = require('./models/paymentHistory.js');
var service = require('./models/service.js');
var userprofile = require('./models/userprofile.js');
var users = require('./models/user.js');

// connect mongoose
var db = "mongodb://localhost:27017/savetax";

// mongoose.connect(db, {useNewUrlParser: true} , function(err){
//     if (err) throw err;
//     else console.log('mongodb connected');
// });

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

categories.createCollection();
chat.createCollection();
notification.createCollection();
order.createCollection();
orderHistory.createCollection();
payment.createCollection();
paymentHistory.createCollection();
service.createCollection();
userprofile.createCollection();
users.createCollection();
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    // app.get('/views' , function(req,res){
    //   categories.find({} , function(err , docs){
    //     if(err) res.json(err);
    //     else res.render('category.html',{categories:docs})

//   });
// });


// login and registration
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

// admin dashboard // routes

app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views"
}));

app.get('/dashboard', function(req, res) {
    res.render('./dashboard/admin/index2.hbs'); // or res.render('index.ejs');
});
app.get('/login', function(req, res) {
    res.render('login.hbs', { title: "Login" }); // or res.render('index.ejs');
});
app.post('/login', function(req, res) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            }
            //use schema.create to insert data into the db
        User.create(userData, function(err, user) {
            if (err) {
                return res.send(err)
            } else {
                return res.send('logged in');
            }
        });
    }
    // or res.render('index.ejs');
});




app.get('/index', function(req, res) {
    res.render('./dashboard/admin/index.html'); // or res.render('index.ejs');
});
// app.get('/dashboard', function (req, res) {
//   res.render('index2'); // or res.render('index.ejs');
// });

//fetch data from db into category.ejs

app.get('/dashboard/category', function(req, res) {
    categories.find({}, function(err, docs) {
        if (err) res.json(err);
        else res.render('./dashboard/admin/category.hbs', { title: "Categories", categories: docs })
    });
});

app.get('/adpage', function(req, res) {
    
        res.render('./dashboard/admin/adpage.hbs');
    });
    app.get('/analytic', function(req, res) {
    
        res.render('./dashboard/admin/analytic.hbs');
    });


app.get('views/index', function(req, res) {
    index.find({}, function(err, docs) {
        if (err) res.json(err);
        else res.render('./views/index.hbs', { title: "Index" })
    });
});
 
//admin 
 


app.get('/blog/create', function(req, res) {
    res.render('./dashboard/admin/editblog.html'); // or res.render('index.ejs');
});


var port = 3000;
app.listen(port, function() {
    console.log('start at port ' + port);
});