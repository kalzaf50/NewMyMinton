const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  country: String,
  ranking: Number,
  events: [String],
  points: Number,
}, { collection: 'Players' });

module.exports = mongoose.model('Players', playerSchema);

