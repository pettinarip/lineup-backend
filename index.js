const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

require('dotenv').config();

require('./models/User');
require('./models/Layout');
require('./models/Player');
require('./models/Lineup');
require('./services/passport');

mongoose.connect('mongodb://localhost/lineup');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

const port = process.env.PORT || 3030;
app.listen(port);
