const { sortBy, nextTick } = require('async');
const Producer = require ('../models/producer')



// Create

exports.producer_create_get = (req, res) => {
	res.send('not yet implemented: producer create GET');
};


exports.producer_create_post = (req, res) => {
	res.send('not yet implemented: producer create POST');
};



// Read

exports.producer_list = (req, res, next) => {
	Producer.find({}, 'stageName')
	.sort([["stageName", "ascending"]])
	.exec(function (err, list_producers) {
		if(err) {
			return next(err);
		}
		res.render('producer_list', { title: "Producer List", producer_list: list_producers})
	})
};


exports.producer_detail = (req, res) => {
	res.send(`not yet implemented: Producer Detail: ${req.params.id}`)
};


//Update


exports.producer_update_get = (req, res) => {
	res.send('not yet implemented: producer update GET');
};

exports.producer_update_post = (req, res) => {
	res.send('not yet implemented: producer update POST');
};

//Delete


exports.producer_delete_get = (req, res) => {
	res.send('not yet implemented: producer delete GET');
};

exports.producer_delete_post = (req, res) => {
	res.send('not yet implemented: producer delete POST');
};