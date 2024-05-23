import mongoose from 'mongoose';

//create schema for entries
var GameSchema = new mongoose.Schema({
  contestId: {
    type: String,
  },
  name: {
    type: String,
  },
  datetime: {
    type: String,
  },
  homeTeam: {
    type: String,
  },
  awayTeam: {
    type: String,
  },
  result: {
    type: String,
  },
});

const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);

export default Game;
