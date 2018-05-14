var express = require('express');
var router = express.Router();

let Municipality = require('../models/municipality');


router.get('/', function(req, res, next) {
    res.render('consultation');
});


router.get('/municipality', function(req, res, next) {
    res.render('consultation_municipality');
});

// Search municipality
router.get('/:municname', function(req, res){
      Municipality.findOne({ municname: req.params.municname }, function (err, municipality) {
      if (err) return handleError(err);
      console.log(municipality);
      res.send(JSON.stringify(municipality));    
    })
});

module.exports = router;
