
var connection = require('../routes/db.js').rdsConnect();

module.exports = {
    framework: function framework(req , res ){
        console.log("this function have been executed");
        res.render('postnewcar',{page_title:'Post new car',user:req.session.user});
    },
    postexe: function postexe(req , res ){
        var price = parseFloat(req.query.price);
        var cartype = req.query.cartype;
        var userID = req.session.user;
        var latitude = parseFloat(req.query.lat);
        var longitude =parseFloat(req.query.lng);
    	var RecordDetailParsedFromForm = {

            price    : price,
            cartype : cartype,
            userID  : userID,
            latitude: latitude,
            longitude: longitude

    	};
    	connection.query("INSERT INTO car SET ? ",RecordDetailParsedFromForm,
            function(err, rows, fields) {
                if (err){
                    console.log(err);
                    throw err;
                }else{
                    var msg = {newid:rows.insertId};
                    res.send(msg);
                }   
        });                       
    }
}
