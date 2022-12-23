const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProducerSchema = new Schema ({
    stageName: {type: String, required: true, maxLength: 51}
})


ProducerSchema.virtual('url').get(function() {
    return `catalog/beat/${this._id}`
});

module.exports = mongoose.model('Producer', ProducerSchema)