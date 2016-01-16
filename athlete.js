var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
  lifterId: { type: String, unique: true, index: true },
  name: String,
  gender: String,
  nationality: String,
  federation: String,
  club: String,
  birthdate: Number,
  age: Number,
  //html for competitions
  //html for best lifts
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  reports: { type: Number, default: 0 },
  random: { type: [Number], index: '2d' },
  voted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Athlete', athleteSchema);