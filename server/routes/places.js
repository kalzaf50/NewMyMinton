// Setup
const express = require('express');
const router = express.Router();
const place = require('../models/PlaceModel');

// GET all players
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    let places;

    if (name) {
      places = await place.find({ name: { $regex: name, $options: 'i' } }); // case-insensitive search
    } else {
      places = await place.find();
    }

    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
