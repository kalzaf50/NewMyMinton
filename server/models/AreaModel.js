const mongoose = require('mongoose');

require('./CourtModel');

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  courts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court', 
    required: true
  }],
}, { collection: 'Area' });

module.exports = mongoose.model('Area', areaSchema);
