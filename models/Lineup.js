const mongoose = require('mongoose');
const { Schema } = mongoose;

const LineupSchema = new Schema({
  layout: { type: Schema.Types.ObjectId, ref: 'layouts' },
  positions: [{
    position: Number,
    player: { type: Schema.Types.ObjectId, ref: 'players' }
  }],
  owner: { type: Schema.Types.ObjectId, ref: 'users' }
});

LineupSchema.methods.toMinimalJSON = function () {
  return {
    id: this.id,
    layout: this.layout.id,
    positions: this.positions.map(({position, player}) => ({
      position,
      player: player.id
    }))
  };
};

LineupSchema.methods.toJSON = function () {
  return {
    id: this.id,
    layout: this.layout,
    positions: this.positions.map(({position, player}) => ({
      position,
      player
    })),
    owner: this.owner.name
  };
};

mongoose.model('lineups', LineupSchema);
