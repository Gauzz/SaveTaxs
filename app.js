var http = require('http');
var express = require('express');
const expressLayouts = require('express-ejs-layouts');
 const flash = require('connect-flash');
const session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const fs = require('fs')
const handlebars = require("express-handlebars");
var expressValidator = require('express-validator');
const passport = require('passport');
const config = require('./config/database');
const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);


var app = express();

//passport config
require('./config/passport')(passport);

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




mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);


mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);


// connect mongoose
var db = "mongodb://localhost:27017/savetax";



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
var urlencodedParser = bodyParser.urlencoded({ extended: true })

//express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// global vars

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

});
    // app.get('/views' , function(req,res){
    //   categories.find({} , function(err , docs){
    //     if(err) res.json(err);
    //     else res.render('category.html',{categories:docs})

//   });
// });
app.use(expressValidator());  //this line to be addded
app.use(jsonParser);
app.use(urlencodedParser);
app.use(router);
var port = 3000;
app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views"
}));
app.listen(port, function() {
    console.log('start at port ' + port);
});
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');






// login and registration
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/category', require('./routes/category'));

// admin dashboard // routes


//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');



app.get('/dashboard', function(req, res) {
    res.render('./dashboard/admin/index.hbs'); // or res.render('index.ejs');
});

app.get('/login', function(req, res) {
    res.render('login.hbs', { title: "Login" }); // or res.render('index.ejs');
});
// app.post('/login', function(req, res) {
//     if (req.body.email &&
//         req.body.username &&
//         req.body.password &&
//         req.body.passwordConf) {
//         var userData = {
//                 email: req.body.email,
//                 username: req.body.username,
//                 password: req.body.password,
//             }
//             use schema.create to insert data into the db
//         User.create(userData, function(err, user) {
//             if (err) {
//                 return res.send(err)
//             } else {
//                 return res.send('logged in');
//             }
//         });
//     }
//     or res.render('index.ejs');
// });





app.get('/registration', function(req, res) {
    res.render('registration.hbs'); // or res.render('index.ejs');
});
// app.get('/dashboard', function (req, res) {
//   res.render('index2'); // or res.render('index.ejs');
// });





app.get('/adminpage', function(req, res) {

    res.render('./dashboard/admin/adminpage.hbs');
});
app.get('/analytic', function(req, res) {

    res.render('./dashboard/admin/analytic.hbs');
});
app.get('./dashboard/category', function(req, res) {

    res.render('./dashboard/admin/category.hbs');
});

app.get('views/index', function(req, res) {
    index.find({}, function(err, docs) {
        if (err) res.json(err);
        else res.render('./views/index.hbs', { title: "Index" })
    });
});

//admin 



app.get('/blog', function(req, res) {
    res.render('./dashboard/admin/editblog.hbs'); // or res.render('index.ejs');
});





//fetch data from db into category.ejs

app.get('/dashboard/category', function(req, res) {
    categories.find({}, function(err, docs) {
        if (err)
            res.json(err);
        else
            res.render('./dashboard/admin/category.hbs', { categories: docs })
    });
});
// Create a new category
//  app.post('/dashboard/category', (req, res) => {
//     console.log(req.body)
//   })

app.post('/dashboard/category', function(req, res) {
    if (req.body.id &&
        req.body.name &&
        req.body.parent_id) {
        var userData = {
                id: req.body.id,
                name: req.body.name,
                parent_id: req.body.parent_id,

            }
            //use schema.create to insert data into the db
        User.create(userData, function(err, user) {
            if (err) {
                return res.send(err)
            } else {
                return res.send('saved');
            }
        });
    }
    // or res.render('category.ejs');
});


app.get('/dashboard/customer', function(req, res) {
    res.render('./dashboard/customer/customerpage.hbs'); // or res.render('index.ejs');
});

app.get('/customer/category', function(req, res) {
    res.render('./dashboard/customer/category.hbs'); // or res.render('index.ejs');
});