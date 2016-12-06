
var connection = require('../routes/db.js').rdsConnect();

module.exports = {
    framework: function framework(req , res ){
        res.render('bookinghistory',{page_title:"Booking history",user:req.session.user});
    },
    getorderhistory: function getorderhistory(req,res){
        var curuser=req.session.user;
        var data=[];
        connection.query("SELECT O1.carorderID,U1.userID,C1.carID,C1.cartype, C1.latitude, C1.longitude, C1.valid, O1.start, O1.end, O1.totalprice FROM User U1, car C1, carorder O1 WHERE U1.userID = C1.userID AND C1.carID = O1.carID AND O1.userID = ? AND O1.self = 0",[curuser],
        function(err, rows, fields) {
            if (err){
                throw err;
            }
            else{
                for(i=0;i<rows.length;i++)
                {   
                    
                    data.push({owner:rows[i].userID,row:i,carorderID:rows[i].carorderID,cartype:rows[i].cartype,latitude:rows[i].latitude,longitude:rows[i].longitude,valid:rows[i].valid,start:rows[i].start,end:rows[i].end,totalprice:rows[i].totalprice});
                }
                res.send(data);
            }
        });

    },
    deleteorder: function deleteorder(req,res){
        var carorderID = req.query.carorderID;
        connection.query("DELETE FROM carorder WHERE carorderID = ? ",[carorderID],
        function(err, rows, fields) {
            if (err){
                console.log(err);
                res.send(err);
                throw err;
            }
            else{
                res.send(JSON.stringify("Delete success"));
            }
        });
    }
};
