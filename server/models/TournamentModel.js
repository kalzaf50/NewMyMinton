const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  }
}, { timestamps: true, collection: 'Tournament' }
);

module.exports = mongoose.model('Tournament', tournamentSchema);
