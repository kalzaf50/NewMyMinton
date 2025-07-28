const express = require('express');
const router = express.Router();
const area = require('../models/AreaModel');

router.get('/', async (req, res) => {
  try {
    const areas = await area.find().populate('courts');
    res.json(areas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
