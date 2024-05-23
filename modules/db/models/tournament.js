import mongoose from 'mongoose';

//create schema
var TournamentSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  display: {
    type: String,
  },
  startDate: {
    type: String,
  },
  status: {
    type: String,
  },
  winner: {
    type: String,
  },
});

const Tournament =
  mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);

export default Tournament;

// {
//   id: "worldcup_round1",
//   display: "Round 1",
//   startDate: "14/06/2018 11:00 ET",
//   status: "Completed",
//   winner: "Mouhamadou Dabo"
// },
