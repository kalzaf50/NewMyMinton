const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  id: String,
  name: String,
  area: String,
}, { collection: 'Places' });

module.exports = mongoose.model('Places', placeSchema);

