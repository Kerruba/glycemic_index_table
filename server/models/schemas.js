let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AlimentModel = new Schema({
    name: String,
    details: String,
    glycemic_index: { type: Number, min: 0, max: 100, required: true},
    glycemic_load: { type: Number, min: 0, max: 100, required: true},
    carbs_percentual: { type: Number, min: 0, max: 100, required: true},
    serving: {}
});

let MealModel = new Schema({
    date: Date,
    description: String,
    total_load: Number,
    content: [{type: Schema.Types.ObjectId, ref: 'AlimentModel'}]
});

module.exports.Aliment = mongoose.model('Aliment', AlimentModel);
module.exports.Meal = mongoose.model('Meal', MealModel);