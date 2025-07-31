// Setup
const express = require('express');
const router = express.Router();
const Player = require('../models/PlayerModel');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// GET all players
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    let players;

    if (name) {
      players = await Player.find({ name: { $regex: escapeRegex(name), $options: 'i' } }); // case-insensitive search
    } else {
      players = await Player.find();
    }

    res.json(players);
  } catch (err) {
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