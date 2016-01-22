var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var events =  require('../controllers/events');
  	res.json(events.allEvents());
});

module.exports = router;
