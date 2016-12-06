var express = require('express');
var router = express.Router();
/* GET home page. */

var imagehome = require("../routes/imagehome");


router.get('/',imagehome.home);

router.post('/postimage',imagehome.postimage);

router.post('/searchimage',imagehome.searchimage);
router.post('/deleteoneimage',imagehome.deleteoneimage);
module.exports = router;
