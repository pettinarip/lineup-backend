const express = require('express');
const passport = require('passport');
const Authentication = require('../controllers/authentication');
const { Router } = express;

const router = Router();

const requireGitHubAuth = passport.authenticate('github', { session: false });

router.get('/github', requireGitHubAuth);
router.get('/github/callback', requireGitHubAuth, Authentication.signin);

// router.get('/google', () => {});
// router.get('/google/callback', () => {});

module.exports = router;
