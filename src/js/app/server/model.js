var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scraper');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var EventsSchema = new mongoose.Schema({
	eventTitle: String, 
	eventLocation: String, 
	eventDescription: String, 
	eventTime: Array, 
	eventLink: String , 
	eventPrice: String,
	eventImage: String; //link to the image
});


module.exports = mongoose.model('Events', EventsSchema);
