
var connection = require('../routes/db.js').rdsConnect();

module.exports = {
    searchCar: function searchCar(req , res ){
        var dist = parseFloat(req.query.dist),
        lat = parseFloat(req.query.lat),
        lng = parseFloat(req.query.lng),
        start = req.query.start,
        end =req.query.end;
        var radius = 6371.0;
        var pi = 3.1415926;
        var upper = lat + (dist/radius)*(180/pi);
        var lower = lat - (dist/radius)*(180/pi);
        var right = lng + (dist/(radius*Math.cos(lat*(pi/180))))*(180/pi);
        var left = lng - (dist/(radius*Math.cos(lat*(pi/180))))*(180/pi);
        connection.query("SELECT * FROM car WHERE latitude >= ? AND latitude <= ? AND longitude >= ? AND longitude <= ? AND valid = 1 AND carID NOT IN (SELECT carID  FROM carorder WHERE (start <= ? AND end >=?) OR (start <= ? AND end >=?) OR (start >= ? AND end<= ?))",[lower,upper,left,right,start,start,end,end,start,end],
        function(err, rows, fields) {
            var data=[];
            if (err){
                console.log(err);
                res.send(data);
            }
            else{
                for(i=0;i<rows.length;i++)
                {
                    data.push({carID:rows[i].carID,price:rows[i].price,cartype:rows[i].cartype,userID:rows[i].userID,latitude:rows[i].latitude,longitude:rows[i].longitude,valid:rows[i].valid});
                }
                //console.log(data);
                res.send(data);
            }
        });
    /*
    console.log(dist);
    console.log(lat);
    console.log(lng);
    console.log(lower);
    console.log(upper);
    console.log(left);
    console.log(right);
    */
    },

    bookingCar: function bookingCar(req , res ){
        var startdate = req.query.start,
        enddate =req.query.end,
        userID = req.query.userID,
        selectedcar = req.query.selectedcar;
        start = transform(startdate);
        end = transform(enddate);
        var totalprice = parseFloat(selectedcar.price) * ((end-start)/1000/24/3600+1);
        //console.log(start);
        //console.log(end);
        //console.log(userID);
        //console.log(selectedcar);
        var RecordDetailParsedFromForm = {

            userID  : userID,
            carID   : selectedcar.carID, 
            bookingprice: parseFloat(selectedcar.price),
            totalprice: totalprice,
            start: startdate,  
            end: enddate,
            self: 0
        };
        console.log(RecordDetailParsedFromForm);
        var msg=[];
        connection.query("INSERT INTO carorder set ? ",RecordDetailParsedFromForm, function(err, rows)
        {
            if (err){
                console.log(err);
                msg.push({message:"Booking failed!",totalprice:0});
                res.send(msg);
               }else{
                console.log("success");
                msg.push({message:"Booking success!",totalprice:totalprice});
                res.send(msg);
               }
        });
    }
};
function transform(oldform){
    var temp = oldform.split("_");
    var newform = temp[1]+"/"+temp[2]+"/"+temp[0];
    result = new Date(newform);
    return result;
}