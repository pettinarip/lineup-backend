const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const { Router } = express;

const router = Router();
const Lineup = mongoose.model('lineups');
const Layout = mongoose.model('layouts');
const Player = mongoose.model('players');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/:lineup', asyncMiddleware(async (req, res, next) => {
  const lineup = await Lineup
    .findById(req.params.lineup)
    .populate('layout')
    .populate('positions.player')
    .populate('owner');
  if (!lineup) return res.sendStatus(404);

  res.json(lineup.toJSON());
}));

router.post('/', requireAuth, asyncMiddleware(async (req, res, next) => {
  const layout = await Layout.findById(req.body.layout);
  if (!layout) return res.sendStatus(404);

  const positions = [];
  await Promise.all(
    req.body.positions.map(
      async position => {
        const player = await Player.findById(position.player);
        if (player) {
          positions.push({
            position: position.position,
            player: player
          });
        }
      }
    )
  );

  const lineup = new Lineup({
    layout,
    positions,
    owner: req.user
  });

  await lineup.save();
  res.json(lineup.toMinimalJSON());
}));

module.exports = router;
