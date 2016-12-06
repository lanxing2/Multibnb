
var connection = require('../routes/db.js').rdsConnect();

module.exports = function regist(req , res , next){
    var name = req.body.name,
    email = req.body.email,
    password = req.body.password,
    password2 = req.body.password2;
    if(name==""||email==""||password==""||password2==""){
        res.render('reg',{page_title:"Sign up for new User",errMSG:"*You must fill all fields"});
    }
    else{    
        if(password==password2){
    	   var RecordDetailParsedFromForm = {

            userID    : name,
            password : password,
            email   : email

    	   };
    	   connection.query("INSERT INTO User set ? ",RecordDetailParsedFromForm, function(err, rows)
    	   {

        	   if (err){
            	   console.log("Error inserting : %s ",err );
                   res.render('reg',{page_title:"*Sign up for new User",errMSG:"This name have aleadry be used"});
        	   }else{
                   req.session.user=name;
        	       res.redirect('/home');
               }
    	   });

        }else{
    	   res.render('reg',{page_title:"*Sign up for new User",errMSG:"The password you enter two times is not same"});
        }
    }
};