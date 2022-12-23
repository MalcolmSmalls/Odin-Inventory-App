const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon")

const BeatSchema = new Schema ({
    title: {type: String, required: true, maxLength: 100},
    producer: {type: Schema.Types.ObjectId, ref: "Producer", required: true},
    tags: {type: Schema.Types.ObjectId, ref: "Tags"},
    bpm: {type: Number, max: 400},
    dateCreated: { type: Date, default: Date.now }
});

BeatSchema.virtual('url').get(function (){
    return `/catalog/beat/${this._id}`
});


BeatSchema.virtual("beatCreated_formatted").get(function () {
    // return `${this.dateCreated}`
	return DateTime.fromJSDate(this.dateCreated).toLocaleString(DateTime.DATE_MED);
});


BeatSchema.virtual("bpm_formatted").get(function(){
    return 'yo'
})
// BeatSchema.virtual('url').get(function() {
//     return `/catalog/beat/${this._id}`
// });

module.exports = mongoose.model('Beat', BeatSchema)

