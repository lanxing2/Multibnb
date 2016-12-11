
var connection = require('../routes/db.js').rdsConnect();

module.exports = {
//Deal with post /login
    login: function login(req , res) {
        var name = req.body.name,
        password = req.body.password;
        if(typeof(name)=="undefined"||typeof(password)=="undefined"||name==""||password==""){
            res.send({msg:"*User or Password cannot be blank"});
        }
        else{    
    	   connection.query("SELECT * FROM User WHERE userID = ? and password = ? ",[name,password], function(err, rows, fields)
    	   {

        	   if (err){
            	   console.log("Error inserting : %s ",err );
                    res.send({msg:"*Database connection error"});
        	   }else{
                    if(rows.length==0){
                        res.send({msg:"*Username or password is wrong"});
                    }else{
                        req.session.user=name;
        	            res.send({msg:"success"});
                    }   
                }
    	   });        
        }

    },

    regist: function regist(req , res , next){
        var name = req.body.name,
        email = req.body.email,
        password = req.body.password,
        password2 = req.body.password2;
        if(typeof(name)=="undefined"||typeof(email)=="undefined"||typeof(password)=="undefined"||typeof(password2)=="undefined"||name==""||email==""||password==""||password2==""){
            res.send({msg:"*All fields must be filled"});
        }
        else{  
            if(password==password2){
                connection.query("SELECT * FROM User WHERE userID = ? ",name,function(err,rows){
                    if(err){
                        console.log("Error select : %s ",err );
                        res.send({msg:"*Databse connection error"});                       
                    }else if(rows.length>0){
                        res.send({msg:"*This username is already been used"});
                    }else{
                        var RecordDetailParsedFromForm = {
                            userID    : name,
                            password : password,
                            email   : email
                        };
                        connection.query("INSERT INTO User set ? ",RecordDetailParsedFromForm, function(err, rows){
                        if (err){
                            console.log("Error inserting : %s ",err );
                            res.send({msg:"*Insert error"});
                        }else{
                            req.session.user=name;
                            res.send({msg:"success"});
                            }
                        });                        
                    }
                });
            }else{
                res.send({msg:"*Password you enter two times should be same"});
            }
        }
    },
//Deal with post /logout
    logout: function logout(req , res ){
        req.session.user = null;
        res.redirect('/login');

    }
};