import mongoose from 'mongoose';

//create schema
var ContestSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  tournamentId: {
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
  multiplier: {
    type: String,
  },
  winner: {
    type: String,
  },
});

const Contest =
  mongoose.models.Contest || mongoose.model('Contest', ContestSchema);

export default Contest;
