// Setup
const express = require('express');
const router = express.Router();
const Player = require('../models/Players');

// GET all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    console.log('Players found:', players);
    res.json(players);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST new player
router.post('/', async (req, res) => {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json(newPlayer);
});

// PUT update player
router.put('/:id', async (req, res) => {
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlayer);
});

// DELETE player
router.delete('/:id', async (req, res) => {
    await Player.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;