const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Beat = require('../models/beat')
const async = require ('async')

const TagsSchema = new Schema({
    tag1: {type: String, minLength: 3, maxLength: 51},
    tag2: {type: String, minLength: 3, maxLength: 51},
    tag3: {type: String, minLength: 3, maxLength: 51}
})

TagsSchema.virtual('url').get(function () {
    return `/collection/tags/${this._id}`
});


module.exports = mongoose.model("Tags", TagsSchema)