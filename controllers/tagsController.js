const Tags = require ('../models/tags')
const Beat = require('../models/beat')
const async = require('async')



// Create

exports.tags_create_get = (req, res) => {
	res.send('not yet implemented: tags create GET');
};


exports.tags_create_post = (req, res) => {
	res.send('not yet implemented: tags create POST');
};



// Read

exports.tags_list = function (req, res, next) {
	Tags.find()
	.sort([["tag1", "ascending"]])
	.exec(function (err, list_tags) {
		if (err) {
			return next(err);
		}
		res.render("tags_list", {
			title: "Tags List",
			tags_list: list_tags
		});
	});
	
};


exports.tags_detail = (req, res, next) => {
	async.parallel(
	{
		tags(callback) {
			Tags.findById(req.params.id).exec(callback);
		},
		tags_beats(callback){
			Beat.find({ tags: req.params.id }).exec(callback);
		},

	},

	(err, results) => {
		if (err) {
			return next(err);
		}
		if (results.tags == null) {
			const err = new Error("Tags not found");
			err.status = 404;
			return next(err);
		}

		res.render("tags_detail", {
			title: "Tags Detail",
			tags: results.tags,
			tags_beats: results.tags_beats,
		});
	}


	);
	
};


//Update


exports.tags_update_get = (req, res) => {
	res.send('not yet implemented: tags update GET');
};

exports.tags_update_post = (req, res) => {
	res.send('not yet implemented: tags update POST');
};

//Delete


exports.tags_delete_get = (req, res) => {
	res.send('not yet implemented: tags delete GET');
};

exports.tags_delete_post = (req, res) => {
	res.send('not yet implemented: tags delete POST');
};