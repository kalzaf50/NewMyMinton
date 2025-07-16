var express = require('express');
var router = express.Router();

const players = [
  { id: 1, name: 'Haikal Zafri', country: 'Malaysia', ranking: 1, events: ["Men's Singles"], points: 50000000 },
  { id: 2, name: 'Shi Yuqi', country: 'China', ranking: 2, events: ["Men's Singles"], points: 94500 },
  { id: 3, name: 'Kunlavut Vitidsarn', country: 'Thailand', ranking: 3, events: ["Men's Singles"], points: 91000 },
  { id: 4, name: 'An Se-young', country: 'South Korea', ranking: 1, events: ["Women's Singles"], points: 100120 },
  { id: 5, name: 'Akane Yamaguchi', country: 'Japan', ranking: 2, events: ["Women's Singles"], points: 97345 }
];

// GET /players
router.get('/', function(req, res, next) {
  res.json(players);
});

module.exports = router;
