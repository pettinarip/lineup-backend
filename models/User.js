const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  github: {
    id: String,
    token: String
  },
  google: {
    id: String,
    token: String
  },
  players: [{ type: Schema.Types.ObjectId, ref: 'players' }]
});

UserSchema.methods.toJSON = function () {
  return {
    name: this.name
  };
};

mongoose.model('users', UserSchema);
