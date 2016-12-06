/*requiring mysql node modules */
var mysql = require("mysql");

var db = function rdsConnect() {
    /*
    	creating MySql database connection 
	*/
	return mysql.createConnection({
		host : HOST,
	  	user : USER,
	  	password : PASSWORD,
	  	database : DATABASE
	});
	connection.connect()
}


module.exports.rdsConnect = db;