const async = require('async');
const beat = require('../models/beat');
const Beat = require('../models/beat')
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


exports.producer_detail = (req, res, next) => {
	async.parallel(
		{
			producer(callback){
				Producer.findById(req.params.id)
				.exec(callback);
			},

			beat(callback){
				Beat.find({producer: req.params.id})
				.exec(callback);
			}
		},
		(err, results) => {
			if(err){
				return next(err)
			}
			if(results.producer == null){
				const err = new Error ("Producer not found")
				err.status = 404;
				return next (err)
			}

			res.render("producer_detail", {
				title: results.producer.stageName,
				producer: results.producer,
				producer_beats: results.beat
			})
		}
	)
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