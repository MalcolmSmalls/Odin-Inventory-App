const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const BeatSchema = new Schema ({
    title: {type: String, required: true, maxLength: 100},
    producer: {type: Schema.Types.ObjectId, ref: "Producer", required: true},
    tags: {type: Schema.Types.ObjectId, ref: "Tags"},
    bpm: {type: Number, max: 400}
});

BeatSchema.virtual('url').get(() => `catalog/beat/${this._id}`);


module.exports = mongoose.model('Beat', BeatSchema)

