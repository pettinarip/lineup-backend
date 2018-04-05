const mongoose = require('mongoose');
const { Schema } = mongoose;

const LayoutSchema = new Schema({
  name: String,
  config: [{
    x: Number,
    y: Number
  }]
});

LayoutSchema.methods.toJSON = function () {
  return {
    id: this.id,
    name: this.name,
    config: this.config
  };
};

mongoose.model('layouts', LayoutSchema);
