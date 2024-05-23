import mongoose from 'mongoose';

//create schema for entries
var EntrySchema = new mongoose.Schema({
  address: {
    type: String,
  },
  contestId: {
    type: String,
  },
  selections: {
    type: Object,
  },
  datetime: {
    type: Date,
  },
  signature: {
    type: String,
  },
  tournamentId: {
    type: String,
  },
  name: {
    type: String,
  },
});

const Entry = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default Entry;
