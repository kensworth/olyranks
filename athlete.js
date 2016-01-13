var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
  lifterId: { type: String, unique: true, index: true },
  name: String,
  nationality: String,
  gender: String,
  age: Number,
  //best lifts, competitions?
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
  random: { type: [Number], index: '2d' },
  voted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Athlete', athleteSchema);