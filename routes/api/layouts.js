const express = require('express');
const mongoose = require('mongoose');
const asyncMiddleware = require('../../utils/asyncMiddleware');
const { Router } = express;

const router = Router();
const Layout = mongoose.model('layouts');

router.get('/', asyncMiddleware(async (req, res, next) => {
  const layouts = await Layout.find({});
  res.json(layouts.map(layout => layout.toJSON()));
}));

module.exports = router;
