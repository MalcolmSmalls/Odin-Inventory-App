const Beat = require ('../models/beat')

// HOMEPAGE
exports.index = (req, res) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
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
	res.send('not yet implemented: beat list');
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