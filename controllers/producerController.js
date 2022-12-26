const async = require('async');
const Beat = require('../models/beat')
const Producer = require ('../models/producer')
const { body, validationResult } = require('express-validator')




// Create

exports.producer_create_get = (req, res, next) => {
	res.render("producer_form", { title: "Create Producer" });

};


exports.producer_create_post = [
	body("stageName", `Producer name required`).trim().isLength({ min: 1 }).escape(),

	(req, res, next) => {
		const errors = validationResult(req);

		const producer = new Producer ({ stageName: req.body.stageName })

		if (!errors.isEmpty()) {

			res.render("producer_form", {
				title: "Create Producer", 
				producer,
				errors: errors.array()	
			});
		return

		} else {
			Producer.findOne({ stageName: req.body.stageName }).exec((err, found_producer) => {
				if(err) {
					return next(err);
				}

				if (found_producer) {
					res.redirect(found_producer.url);
				}else {
					producer.save((err) => {
						if(err) {
							return next(err)
						}
						res.redirect(producer.url)
					})
				}
			})
		}

	}


]


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


exports.producer_delete_get = (req, res, next) => {
	async.parallel(
		{
			producer(callback){
				Producer.findById(req.params.id).exec(callback);
			},
		
			producer_beats(callback){
				Beat.find({ producer: req.params.id}).exec(callback);
			},

		},
		(err, results) => {
			if(err){
				return next(err);
			}
			if (results.producer == null) {
				res.redirect("/collection/producer");
			}
		
	

			res.render("producer_delete", {
				title: "Delete Producer", 
				producer: results.producer,
				producer_beats: results.producer_beats
			});

		}

	);

};

exports.producer_delete_post = (req, res, next) => {
	async.parallel (

  	  { 
		producer(callback){
			Producer.findById(req.body.producerid).exec(callback);
		},

		producer_beats(callback){
			Beat.find({ producer: req.body.producerid }).exec(callback);
		},
	  }, 
	  (err, results) => {
		if(err){
			return next(err);
		}

		if (results.producer_beats.length > 0){
			res.render("producer_delete", {
				title: "Delete Producer",
				producer: results.producer,
				producer_beats: results.producer_beats

			});

			return

		}

		Producer.findByIdAndRemove(req.body.producerid, (err) => {
		  if (err) {
			return next(err);
		  }
		  res.redirect("/collection/producer")
		});
	
	  }

	);


};