const express = require('express');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const { Router } = express;

const router = Router();

router.get('/user', asyncMiddleware(async (req, res, next) => {
  res.json(req.user.toJSON());
}));

module.exports = router;
