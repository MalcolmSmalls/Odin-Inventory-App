const Beat = require ('../models/beat')
const Producer = require ('../models/producer')
const Tags = require ('../models/tags')
const async = require('async')

// HOMEPAGE
exports.index = (req, res) => {
    async.parallel(
        {
          beat_count(callback) {
            Beat.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
          },
          producer_count(callback) {
            Producer.countDocuments({}, callback);
          },
          tags_count(callback) {
            Tags.countDocuments({}, callback);
          },
        },
        (err, results) => {
          res.render("index", {
            title: "Beat Collection",
            error: err,
            data: results,
          });
        }
      );
    };

// Create

exports.beat_create_get = (req, res) => {
	res.send('not yet implemented: beat create GET');
};


exports.beat_create_post = (req, res) => {
	res.send('not yet implemented: beat create POST');
};



// Read

exports.beat_list = (req, res) => {
    Beat.find({}, "title producer")
    .sort({ title: 1 })
    .populate("producer")
    .exec(function (err, list_beats) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("beat_list", { title: "Beat List", beat_list: list_beats });
    });
};



exports.beat_detail = (req, res) => {
	res.send(`not yet implemented: beat Detail: ${req.params.id}`)
};


//Update


exports.beat_update_get = (req, res) => {
	res.send('not yet implemented: beat update GET');
};

exports.beat_update_post = (req, res) => {
	res.send('not yet implemented: beat update POST');
};

//Delete


exports.beat_delete_get = (req, res) => {
	res.send('not yet implemented: beat delete GET');
};

exports.beat_delete_post = (req, res) => {
	res.send('not yet implemented: beat delete POST');
};