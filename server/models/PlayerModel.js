const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  ranking: {
    type: Number,
    required: true
  },
  events: [String],
  points: Number,
}, { collection: 'Players' });

module.exports = mongoose.model('Players', playerSchema);

