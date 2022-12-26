const Beat = require ('../models/beat')
const Producer = require ('../models/producer')
const Tags = require ('../models/tags')
const async = require('async')
const { body, validationResult } = require('express-validator');

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
	res.render('beat_form', {Title:'Create a beat'})
};


exports.beat_create_post = [
  body('title')
    .trim()
    .isLength( {min: 1} )
    .escape()
    .withMessage ( 'Title required'),

  body('producer')
    .trim()
    .isLength( {min: 1} )
    .escape()
    .withMessage ( 'Producer is required' ),

  body('tags.*')
    .escape(),

  body('bpm')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    const tags = new Tags({
      tag1: req.body.tag1,
      tag2: req.body.tag2,
      tag3: req.body.tag3
    })

    const producer = new Producer({
      stageName: req.body.producer
    })

    const beat = new Beat ({
      title: req.body.title,
      producer: producer,
      tags: tags,
      bpm: req.body.bpm
    });

    if ( !errors.isEmpty() ) { 
      res.render('beat_form', {
        title: "Create Beat",
        beat,
        errors: errors.array() 
      })
    return
    }

    producer.save((err) => {
      if(err){
        return next(err)
      }
    })

    tags.save((err) => {
      if(err){
        return next(err)
      }
    })

    beat.save((err) => {
      if(err){
        return next(err)
      }
      res.redirect(beat.url)
    })
  }


]



// Read

exports.beat_list = (req, res) => {
    Beat.find()
    .sort({ title: 1 })
    .populate("producer")
    .populate("tags")
    .exec(function (err, list_beats) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("beat_list", { title: "Beat List", beat_list: list_beats });
    });
};



exports.beat_detail = (req, res, next) => {
	async.parallel(
	{
    beat(callback){
      Beat.findById(req.params.id)
      .populate("producer")
      .populate("tags")
      .exec(callback);

    }
	},
	(err, results) => {
		if(err) {
			return next(err);
		}
		if(results.beat == null) {
			const err = new Error ("Beat not found");
			err.status = 404;
			return next (err)
		}

		res.render("beat_detail", {
			title: results.beat.title,
			beat: results.beat
		})
	}

	)

}



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