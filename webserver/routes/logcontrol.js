
var connection = require('../routes/db.js').rdsConnect();

module.exports = {
    login: function login(req , res) {
        var name = req.body.name,
        password = req.body.password;
        if(name==""||password==""){
            res.render('login',{page_title:"MultiBNB",errMSG:"*You must fill all fields"});
        }
        else{    

    	   connection.query("SELECT * FROM User WHERE userID = ? and password = ? ",[name,password], function(err, rows, fields)
    	   {

        	   if (err){
            	   console.log("Error inserting : %s ",err );
                    res.render('login',{page_title:"MultiBNB",errMSG:"*You must fill all fields"});
        	   }else{
                    if(rows.length==0){
                        res.render('login',{page_title:"MultiBNB",errMSG:"*Username or password is wrong"});
                    }else{
                        req.session.user=name;
        	           res.redirect('/home');
                    }   
                }
    	   });        
        }

    },

    logout: function logout(req , res ){
        req.session.user = null;
        res.redirect('/login');

    }
};