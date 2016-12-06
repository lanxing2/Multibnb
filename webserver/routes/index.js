var express = require('express');
var router = express.Router();
/* GET home page. */
var checkNotLogin = require('../routes/check').checkNotLogin;
var checkLogin = require('../routes/check').checkLogin;

var regist = require("../routes/regist");
var homecontrol = require("../routes/homecontrol");
var logcontrol = require("../routes/logcontrol");
var bookinghistory = require("../routes/bookinghistorycontrol");
var viewmycars = require("../routes/viewmycarscontrol");
var postnewcar = require("../routes/postnewcarcontrol");


router.get('/',checkNotLogin,function(req,res){
	res.redirect('/login');
});

router.get('/login',checkNotLogin,function(req,res){
	res.render('login',{page_title:"MultiBNB",errMSG:""});
});

router.get('/reg', checkNotLogin,function(req,res){
	res.render('reg',{page_title:"Sign up for new User",errMSG:""});
});

router.get('/home',checkLogin,function(req,res){
	res.render('home',{page_title:"Homepage",user:req.session.user});
});

router.get('/bookinghistory',checkLogin,bookinghistory.framework);
router.get('/viewmycars',checkLogin,viewmycars.framework);



router.post('/reg',regist);
router.post('/login',logcontrol.login);
router.get('/logout',logcontrol.logout);
router.get('/searchCar',checkLogin,homecontrol.searchCar);
router.get('/booking',checkLogin,homecontrol.bookingCar);
router.get('/getorderhistory',checkLogin,bookinghistory.getorderhistory);
router.get('/deleteorder',checkLogin,bookinghistory.deleteorder);
router.get('/getmycars',checkLogin,viewmycars.getmycars);
router.get('/changecarstatus',checkLogin,viewmycars.changecarstatus);
router.get('/orderofcar',checkLogin,viewmycars.orderofcar);
router.get('/updatecar',checkLogin,viewmycars.updatecar);
router.get('/postnewcar',checkLogin,postnewcar.framework);		//Open the postnew car web page
router.get('/postnewcarexe',checkLogin,postnewcar.postexe);		//Post new car

module.exports = router
