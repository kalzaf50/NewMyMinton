const express = require('express');
const router = express.Router();
const Tournament = require('../models/TournamentModel');

// GET all tournaments (with optional name search)
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const query = name
      ? { name: { $regex: name, $options: 'i' } } // case-insensitive
      : {};

    const tournaments = await Tournament.find(query).sort({ date: -1 });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new tournament
router.post('/', async (req, res) => {
  try {
    const newTournament = new Tournament(req.body);
    const saved = await newTournament.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update tournament by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Tournament not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE tournament by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tournament.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tournament not found' });
    res.json({ message: 'Tournament deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
