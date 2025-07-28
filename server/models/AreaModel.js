const mongoose = require('mongoose');

require('./CourtModel');

const areaSchema = new mongoose.Schema({
  name: String,
  area: String,
  courts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court', 
  }],
}, { collection: 'Area' });

module.exports = mongoose.model('Area', areaSchema);
