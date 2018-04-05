const express = require('express');
const mongoose = require('mongoose');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const { Router } = express;

const router = Router();
const User = mongoose.model('users');
const Player = mongoose.model('players');

router.get('/', asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('players');
  res.json(user.players.map(player => player.toJSON()));
}));

router.post('/', asyncMiddleware(async (req, res, next) => {
  const player = new Player(req.body.player);
  await player.save();

  req.user.players.push(player);
  await req.user.save();

  res.json(player.toJSON());
}));

module.exports = router;
