const express = require('express');
const router = express.Router();

const beatController = require('../controllers/beatController');
const producerController = require('../controllers/producerController');
const tagsController = require('../controllers/tagsController');

// HOME PAGE

router.get('/', beatController.index)


// CREATE

router.get("/beat/create", beatController.beat_create_get);

router.post("/beat/create", beatController.beat_create_post);

// READ

router.get("/beat/:id", beatController.beat_detail);

router.get("/beat", beatController.beat_list);


// UPDATE 

router.get("/beat/:id/update", beatController.beat_update_get);

router.post("/beat/:id/update", beatController.beat_update_post);

// DELETE

router.get("/beat/:id/delete", beatController.beat_delete_get);

router.post("/beat/:id/delete", beatController.beat_delete_post);



// PRODUCER //


// CREATE

router.get("/producer/create", producerController.producer_create_get);

router.post("/producer/create", producerController.producer_create_post);

// READ

router.get("/producer/:id", producerController.producer_detail);

router.get("/producer", producerController.producer_list);


// UPDATE 

router.get("/producer/:id/update", producerController.producer_update_get);

router.post("/producer/:id/update", producerController.producer_update_post);

// DELETE

router.get("/producer/:id/delete", producerController.producer_delete_get);

router.post("/producer/:id/delete", producerController.producer_delete_post);


/// TAGS ////

// CREATE

router.get("/tags/create", tagsController.tags_create_get);

router.post("/tags/create", tagsController.tags_create_post);

// READ

router.get("/tags/:id", tagsController.tags_detail);

router.get("/tagss", tagsController.tags_list);


// UPDATE 

router.get("/tags/:id/update", tagsController.tags_update_get);

router.post("/tags/:id/update", tagsController.tags_update_post);

// DELETE

router.get("/tags/:id/delete", tagsController.tags_delete_get);

router.post("/tags/:id/delete", tagsController.tags_delete_post);



module.exports = router;