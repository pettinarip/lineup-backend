const express = require('express');
const passport = require('passport');
const { Router } = express;

const requireAuth = passport.authenticate('jwt', { session: false });

const router = Router();

router.use('/', requireAuth, require('./users'));
router.use('/players', requireAuth, require('./players'));
router.use('/layouts', require('./layouts'));
router.use('/lineups', require('./lineups'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
