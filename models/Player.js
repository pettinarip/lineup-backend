const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  name: String,
  number: Number
});

playerSchema.methods.toJSON = function () {
  return {
    id: this.id,
    name: this.name,
    number: this.number
  };
};

mongoose.model('players', playerSchema);
