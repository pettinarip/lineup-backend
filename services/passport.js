const passport = require('passport');
const mongoose = require('mongoose');
const GitHubStrategy = require('passport-github').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = mongoose.model('users');

// GitHub strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = new User();
  newUser.email = email;
  newUser.name = profile.displayName;
  newUser.github.id = profile.id;
  newUser.github.token = accessToken;
  await newUser.save();

  done(null, newUser);
}));

// JWT strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET
}, async (payload, done) => {
  const existingUser = await User.findById(payload.sub);

  if (existingUser) {
    return done(null, existingUser);
  } else {
    return done(null, false);
  }
}));
