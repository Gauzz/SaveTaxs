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
const handlebars = require('express-handlebars');
var expressValidator = require('express-validator');
const passport = require('passport');
const config = require('./config/database');
const Strategy = require('passport-local').Strategy;
var io = require('socket.io')(app);

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



mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);


// connect mongoose
const db = 'mongodb://localhost:27017/savetax'; 
 


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

//body parse
app.use(express.urlencoded({extended: false}));

//express session
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false
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
var port = 80;
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



app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
 });


// login and registration
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/category', require('./routes/category'));
app.use('/userprofile', require('./routes/userprofile'));


// admin dashboard // routes


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// passport.use(new Strategy(
//     (email, password, done) => {
//         app.locals.users.findOne({email}, (err, user) => {
//           if (err) {
//               return done(err);
//           } 
//           if (!user){
//               return done(null, false);
//           }
//           if (user.password != password){
//               return done(null, false);
//           }
//           return done(null, user);
//         });
//     }
// ));

// passport.serializeUser((user, done) =>{
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) =>{
//     done(null, {id});
// });


// chat box function


console.log("App running...");


function response(req, res) {
    var file = "";
    if(req.url == "/dashboard/chat1"){
	   file = __dirname + './dashboard/customer/chat1.hbs';
    } else {
	   file = __dirname + req.url;
    }
   
    fs.readFile(file,
	    function (err, data) {
			if (err) {
				res.writeHead(404);
				return res.end('Page or file not found');
			}

			res.writeHead(200);
			res.end(data);
	    }
    );
}


app.get('/', function(req, res){
    fs.readFile(__dirname + 'chat1.hbs', function(error, data) {
       res.writeHead(200);
       res.end(data);         
    });
  });
 

//   app.get('/', (req, res) => {
// 	res.render('chat1')
// })

io.on("connection", function(socket){
    socket.on("send message", function(sent_msg, callback){
		sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;

		io.sockets.emit("update messages", sent_msg);
		callback();
    });
});

function getCurrentDate(){
	var currentDate = new Date();
	var day = (currentDate.getDate()<10 ? '0' : '') + currentDate.getDate();
	var month = ((currentDate.getMonth() + 1)<10 ? '0' : '') + (currentDate.getMonth() + 1);
	var year = currentDate.getFullYear();
	var hour = (currentDate.getHours()<10 ? '0' : '') + currentDate.getHours();
	var minute = (currentDate.getMinutes()<10 ? '0' : '') + currentDate.getMinutes();
	var second = (currentDate.getSeconds()<10 ? '0' : '') + currentDate.getSeconds();

	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}



app.get('/dashboard/admin/index2.html', function(req, res) {
    res.render('./dashboard/admin/index2.html'); // or res.render('index.ejs');
});

app.get('/login', function(req, res) {
    res.render('login.hbs', { title: "Login" }); // or res.render('index.ejs');
});
 

app.get('/publicprofile', function(req, res) {
    res.render('publicprofile.hbs', { title: "Profile" }); // or res.render('index.ejs');
});


app.get('/customerFeedback', function(req, res){
    res.render('./dashboard/customer/customerfeedback.hbs');
});

app.get('/index', function(req, res) {
    res.render('./dashboard/admin/index.html'); // or res.render('index.ejs');
});

app.get('/registration', function(req, res) {
     res.render('registration.hbs'); // or res.render('index.ejs');
   
   });
 app.get('/dashboard', function (req, res) {
   res.render('index2'); // or res.render('index.ejs');
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


app.get('/footerBlog', function(req, res) {
    res.render('./dashboard/admin/footerBlog.hbs'); // or res.render('index.ejs');
});


app.get('/contact', function(req, res) {
    res.render('./dashboard/admin/contact.hbs'); // or res.render('index.ejs');
});

app.get('/contactus', function(req, res) {
    res.render('./dashboard/admin/contactus.hbs'); // or res.render('index.ejs');
});

app.get('/helpdesk', function(req, res) {
    res.render('./dashboard/admin/helpdesk.hbs'); // or res.render('index.ejs');
});
app.get('/pressrelease', function(req, res) {
    res.render('./dashboard/admin/pressrelease.hbs'); // or res.render('index.ejs');
});
app.get('/about', function(req, res) {
    res.render('./dashboard/admin/about.hbs'); // or res.render('index.ejs');
});

app.get('/notification', function(req, res) {
    res.render('./dashboard/admin/notification.hbs'); // or res.render('index.ejs');
});

app.get('/chat', function(req, res) {
    res.render('./dashboard/admin/chat.hbs'); // or res.render('index.ejs');
});


app.get('/cart', function(req, res) {
    res.render('./dashboard/admin/cart.hbs'); // or res.render('index.ejs');
    
});

app.get('/payment', function(req, res) {
    res.render('./dashboard/admin/payment.hbs'); // or res.render('index.ejs');
  
});

//Menu Services Route
app.get('/privatelimcom', function(req, res) {
    res.render('./dashboard/admin/services/privatelimcom.hbs'); // or res.render('index.ejs');
  
});
app.get('/llp', function(req, res) {
    res.render('./dashboard/admin/services/llp.hbs'); // or res.render('index.ejs');
  
});
app.get('/oneperson', function(req, res) {
    res.render('./dashboard/admin/services/oneperson.hbs'); // or res.render('index.ejs');
  
});

app.get('/partnership', function(req, res) {
    res.render('./dashboard/admin/services/partnership.hbs'); // or res.render('index.ejs');
  
});


app.get('/propertoship', function(req, res) {
    res.render('./dashboard/admin/services/propertoship.hbs'); // or res.render('index.ejs');
  
});
app.get('/nidhicom', function(req, res) {
    res.render('./dashboard/admin/services/nidhicom.hbs'); // or res.render('index.ejs');
  
});

app.get('/producercom', function(req, res) {
    res.render('./dashboard/admin/services/producercom.hbs'); // or res.render('index.ejs');
  
});
app.get('/otherservice', function(req, res) {
    res.render('./dashboard/admin/services/otherservice.hbs'); // or res.render('index.ejs');
  
});
app.get('/digisignatur', function(req, res) {
    res.render('./dashboard/admin/services/digisignatur.hbs'); // or res.render('index.ejs');
  
});
app.get('/businessfund', function(req, res) {
    res.render('./dashboard/admin/services/businessfund.hbs'); // or res.render('index.ejs');
  
});app.get('/fssai', function(req, res) {
    res.render('./dashboard/admin/services/fssai.hbs'); // or res.render('index.ejs');
  
});app.get('/itr', function(req, res) {
    res.render('./dashboard/admin/services/itr.hbs'); // or res.render('index.ejs');
  
});app.get('/esi', function(req, res) {
    res.render('./dashboard/admin/services/esi.hbs'); // or res.render('index.ejs');
  
});app.get('/pf', function(req, res) {
    res.render('./dashboard/admin/services/pf.hbs'); // or res.render('index.ejs');
  
});app.get('/tax', function(req, res) {
    res.render('./dashboard/admin/services/tax.hbs'); // or res.render('index.ejs');
  
});app.get('/professnaltax', function(req, res) {
    res.render('./dashboard/admin/services/professnaltax.hbs'); // or res.render('index.ejs');
  

});app.get('/tds', function(req, res) {
    res.render('./dashboard/admin/services/tds.hbs'); // or res.render('index.ejs');
  
});

app.get('/legalnotic', function(req, res) {
    res.render('./dashboard/admin/services/legalnotic.hbs'); // or res.render('index.ejs');
});


app.get('/patent', function(req, res) {
    res.render('./dashboard/admin/services/patent.hbs'); // or res.render('index.ejs');
});
app.get('/Legal_Heir', function(req, res) {
    res.render('./dashboard/admin/services/legalHeir.hbs'); // or res.render('index.ejs');
});
app.get('/Succession', function(req, res) {
    res.render('./dashboard/admin/services/succession.hbs'); // or res.render('index.ejs');
});
app.get('/Relinquish', function(req, res) {
    res.render('./dashboard/admin/services/relinquish.hbs'); // or res.render('index.ejs');
});
app.get('/Public', function(req, res) {
    res.render('./dashboard/admin/services/public.hbs'); // or res.render('index.ejs');
});
app.get('/PropertyVerify', function(req, res) {
    res.render('./dashboard/admin/services/propertyVerify.hbs'); // or res.render('index.ejs');
});
app.get('/PropertyRegistration', function(req, res) {
    res.render('./dashboard/admin/services/propertyReg.hbs'); // or res.render('index.ejs');
});
app.get('/MoneyRecovery', function(req, res) {
    res.render('./dashboard/admin/services/moneyRecovery.hbs'); // or res.render('index.ejs');
});
app.get('/GenderChange', function(req, res) {
    res.render('./dashboard/admin/services/genderChange.hbs'); // or res.render('index.ejs');
});
app.get('/residential', function(req, res) {
    res.render('./dashboard/admin/services/residential.hbs'); // or res.render('index.ejs');
});
app.get('/Conjugal', function(req, res) {
    res.render('./dashboard/admin/services/conjugal.hbs'); // or res.render('index.ejs');
});
app.get('/Complaints', function(req, res) {
    res.render('./dashboard/admin/services/complaine.hbs'); // or res.render('index.ejs');
});
app.get('/Caste', function(req, res) {
    res.render('./dashboard/admin/services/caste.hbs'); // or res.render('index.ejs');
});
app.get('/CaveatPetition', function(req, res) {
    res.render('./dashboard/admin/services/CaveatPetition.hbs'); // or res.render('index.ejs');
});
app.get('/Trade_License', function(req, res) {
    res.render('./dashboard/admin/services/trade.hbs'); // or res.render('index.ejs');
});
app.get('/Will', function(req, res) {

    res.render('./dashboard/admin/services/will.hbs');
});
app.get('/Web-and-App', function(req, res) {
    res.render('./dashboard/admin/services/web-and-app.hbs'); // or res.render('index.ejs');
});
app.get('/Shop-And-Establishment', function(req, res) {
    res.render('./dashboard/admin/services/shopANDestablishment.hbs'); // or res.render('index.ejs');
});
app.get('/NGO', function(req, res) {
    res.render('./dashboard/admin/services/NGO.hbs'); // or res.render('index.ejs');
});
app.get('/SSI-MSME', function(req, res) {
    res.render('./dashboard/admin/services/msme.hbs'); // or res.render('index.ejs');
});
app.get('/ISO', function(req, res) {
    res.render('./dashboard/admin/services/ISO.hbs'); // or res.render('index.ejs');
});
app.get('/IMPORTERCODE', function(req, res) {
    res.render('./dashboard/admin/services/importerCode.hbs'); // or res.render('index.ejs');
});
app.get('/Copyright', function(req, res) {
    res.render('./dashboard/admin/services/copyright.hbs'); // or res.render('index.ejs');
});
app.get('/Accounts', function(req, res) {
    res.render('./dashboard/admin/services/accounts.hbs'); // or res.render('index.ejs');
});
app.get('/Trademark', function(req, res) {
    res.render('./dashboard/admin/services/trademark.hbs'); // or res.render('index.ejs');
});
app.get('/NameChange', function(req, res) {
    res.render('./dashboard/admin/services/nameChange.hbs'); // or res.render('index.ejs');
});
app.get('/businessplan', function(req, res) {
    res.render('./dashboard/admin/services/businessplan.hbs'); // or res.render('index.ejs');
});
app.get('/businessloan', function(req, res) {
    res.render('./dashboard/admin/services/businessloan.hbs'); // or res.render('index.ejs');
});
app.get('/GSTReturn', function(req, res) {
    res.render('./dashboard/admin/services/GSTReturn.hbs'); // or res.render('index.ejs');
});

app.get('/dashboard/chat1', function(req, res) {
    res.render('./dashboard/customer/chat1.hbs'); // or res.render('index.ejs');
});


app.get('/dashboard/coupon', function(req, res) {
    res.render('./dashboard/customer/coupon.hbs'); // or res.render('index.ejs');
});
app.get('/dashboard/wishlist', function(req, res) {
    res.render('./dashboard/customer/wishlist.hbs'); // or res.render('index.ejs');
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


app.get('/dashboard/customerpage', function(req, res) {
    res.render('./dashboard/customer/customerpage.hbs'); // or res.render('index.ejs');
});


app.get('/customer/profile', function(req, res) {
    res.render('./dashboard/customer/pro.hbs'); // or res.render('index.ejs');
});
app.get('/customer/support', function(req, res) {
    res.render('./dashboard/customer/support.hbs'); // or res.render('index.ejs');
});