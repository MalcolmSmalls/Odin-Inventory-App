#! /usr/bin/env node

console.log('This script populates some test beats, producers, and tags to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/?retryWrites=true&w=majority');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Beat = require('./models/beat')
var Producer = require('./models/producer')
var Tags = require('./models/tags')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var producers = []
var tagsList = []
var beats = []

function producerCreate(stageName, cb) {
  producerdetail = {stageName: stageName }
  
  var producer = new Producer(producerdetail);
       
  producer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Producer: ' + producer);
    producers.push(producer)
    cb(null, producer)
  }  );
}

function tagCreate(tag1, tag2, tag3, cb) {
  tagsdetail = {tag1: tag1, tag2: tag2, tag3: tag3}

  var tags = new Tags(tagsdetail);
  if (tag1 != false) tagsdetail.tag1 = tag1
  if (tag2 != false) tagsdetail.tag2 = tag2
  if (tag3 != false) tagsdetail.tag3 = tag3
       
  tags.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Tags: ' + tags);
    tagsList.push(tags)
    cb(null, tags);
  }   );
}

function beatCreate(title, producer, tags, bpm, cb) {
  beatdetail = { 
    title: title,
    producer: producer,
    tags: tags,
    bpm: bpm
  }
  if (tags != false) beatdetail.tags = tags
  var beat = new Beat(beatdetail);    
  beat.save(function (err) {

    if (err) {
      cb(err, null)
      return;
    }
    console.log('New Beat: ' + beat);
    beats.push(beat)
    cb(null, beat)
  }  );
}

function createTagsProducers(cb) {
    async.series([
        function(callback) {
          producerCreate('Big Chop', callback);
        },
        function(callback) {
          producerCreate('Malcolm Smalls', callback);
        },
        function(callback) {
          producerCreate('stuKidd', callback);
        },
        function(callback) {
          producerCreate('chop1n', callback);
        },
        function(callback) {
          producerCreate('flamas', callback);
        },
        function(callback) {
          tagCreate("Hip-Hop", "Lo-Fi", "EastCoast", callback);
        },
        function(callback) {
          tagCreate("Trap", "Classical", "South", callback);
        },
        function(callback) {
          tagCreate("Latin", "Trap", "Bounce", callback);
        },
        ],
        // optional callback
        cb);
}


function createBeats(cb) {
    async.parallel([
        function(callback) {
          beatCreate('Big Spender', producers[0], tagsList[0], 100, callback);
        },
        function(callback) {
          beatCreate("Weight", producers[3], tagsList[0], 70, callback);
        },
        function(callback) {
          beatCreate("Chevron Gas", producers[0], tagsList[0], 81, callback);
        },
        function(callback) {
          beatCreate("Ganesh", producers[1], tagsList[1], 60, callback);
        },
        function(callback) {
          beatCreate("Calypso Music", producers[2], tagsList[1], 75, callback);
        },
        function(callback) {
          beatCreate('Shake it Off', producers[4], tagsList[2], 70, callback);
        },
        // function(callback) {
        //   beatCreate('PUNK', producers[2], false, false, callback)
        // },
        ],
        // optional callback
        cb);
}




async.series([
    createTagsProducers,
    createBeats
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+beats);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




