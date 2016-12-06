var fs = require('fs');
var multiparty = require('multiparty');
var crypto = require('crypto');
var carImageModel = require('../routes/schema.js').carImageModel;

module.exports = {
    home: function home(req,res){
    	res.render('imagehome',{page_title:"Imagehome"});
    },
    postimage: function postimage(req , res ){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var form = new multiparty.Form();
        form.uploadDir = "./public/carimg/"
        form.parse(req, function (err, fields, files) {
            var prefix = crypto.createHash('md5').update(fields.carID[0]).digest('hex').substring(0,16);
            console.log(prefix);            
            for(var i=0;i<files.carimage.length;i++){
                var randomname = randomString(16);
                var newname = "./public/carimg/"+randomname+files.carimage[i].path.substring(14);
                fs.renameSync(files.carimage[i].path,newname);
                var newimage = new carImageModel({
                    prefix:prefix,
                    path: "/carimg/"+randomname+files.carimage[i].path.substring(14),
                    originalFilename: files.carimage[i].originalFilename
                });
                newimage.save(function (err, res) {
                    if (err) {
                        console.log("Error:" + err);
                    }
                    else {
                        console.log("Res:" + res);
                    }
                });

            }
            res.send(JSON.stringify("message received"));
        });        
    },

    searchimage: function searchimage(req , res ){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var carID = req.body.carID;
        var images = [];
        var prefix = crypto.createHash('md5').update(carID).digest('hex').substring(0,16);
        var wherestr ={"prefix":prefix};
        carImageModel.find(wherestr, function(err, result){
            if (err) {
                console.log("Error:" + err);
            }else {
                for(var i=0;i<result.length;i++){
                    images.push(result[i].path);
                }
                res.send(images);
                //console.log("Res:" + res);
            }
        });
    },
    deleteoneimage: function deleteoneimage(req , res ){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var path = req.body.path;
        var deletefile = "./public"+path; 
        fs.unlinkSync(deletefile);
        var wherestr ={"path":path};
        carImageModel.remove(wherestr, function(err, result){
            if (err) {
                console.log("Error:" + err);
            }else {
                console.log("Result"+result);
                //console.log("Res:" + res);
            }
        });
        res.send(JSON.stringify("delete success"));
    }

};

function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}


