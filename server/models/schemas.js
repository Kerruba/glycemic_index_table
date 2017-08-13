let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Aliment = new Schema({
    name: String,
    details: String,
    glycemic_index: { type: Number, min: 0, max: 100, required: true},
    glycemic_load: { type: Number, min: 0, max: 100, required: true},
    carbs_percentual: { type: Number, min: 0, max: 100, required: true},
    serving: {}
});

let Meal = new Schema({
    date: Date,
    description: String,
    total_load: Number,
    content: [{type: Schema.Types.ObjectId, ref: 'Aliment'}]
});

module.exports.Aliment = mongoose.model('Aliment', Aliment);
module.exports.Meal = mongoose.model('Meal', Meal);