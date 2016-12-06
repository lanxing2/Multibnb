
var connection = require('../routes/db.js').rdsConnect();

module.exports = {
    framework: function framework(req , res ){
        res.render('viewmycar',{page_title:"The cars you own:",user:req.session.user});
    },
    getmycars: function getmycars(req,res){
        var curuser=req.session.user;
        var data=[];
        connection.query("SELECT * FROM car WHERE userID = ? ORDER BY carID",[curuser],
        function(err, rows, fields) {
            if (err){
                throw err;
            }
            else{
                for(i=0;i<rows.length;i++)
                {   
                    data.push({carID:rows[i].carID,price:rows[i].price,cartype:rows[i].cartype,userID:rows[i].userID,latitude:rows[i].latitude,longitude:rows[i].longitude,valid:rows[i].valid});
                }
                res.send(data);
            }
        });

    },
    changecarstatus: function changecarstatus(req,res){
        var carID = req.query.carID;
        var valid = req.query.valid;
        connection.query("UPDATE car SET valid=? WHERE carID = ? ",[valid,carID],
        function(err, rows, fields) {
            if (err){
                console.log(err);
                res.send(err);
                throw err;
            }
            else{
                res.send(JSON.stringify("Change status success"));
            }
        });
    },
    orderofcar: function orderofcar(req,res){
        var carID = req.query.carID;
        var data = [];
        connection.query("SELECT O1.carorderID,O1.userID,C1.carID,C1.cartype, C1.latitude, C1.longitude, C1.valid, O1.start, O1.end, O1.totalprice, O1.bookingprice FROM User U1, car C1, carorder O1 WHERE U1.userID = C1.userID AND C1.carID = O1.carID AND O1.carID = ? AND O1.self = 0",[carID],
        function(err, rows, fields) {
            if (err){
                console.log(err);
                res.send(err);
                throw err;
            }
            else{
                for(var i=0;i<rows.length;i++){
                    data.push({costomer:rows[i].userID,carorderID:rows[i].carorderID,cartype:rows[i].cartype,latitude:rows[i].latitude,longitude:rows[i].longitude,valid:rows[i].valid,start:rows[i].start,end:rows[i].end,totalprice:rows[i].totalprice,bookingprice:rows[i].bookingprice});
                }
                res.send(data);
            }
        });
    },
    updatecar: function updatecar(req,res){
        var carID = req.query.carID;
        var updatedata = {
            cartype:req.query.cartype,
            price:parseFloat(req.query.price),
            latitude:parseFloat(req.query.lat),
            longitude:parseFloat(req.query.lng),
            valid:parseInt(req.query.valid)
        };
        connection.query("UPDATE car SET ? WHERE carID = ? ",[updatedata,carID],
        function(err, rows, fields) {
            if (err){
                console.log(err);
                res.send(err);
                throw err;
            }
            else{
                res.send(JSON.stringify("Update car success"));
            }
        });
    },


};
