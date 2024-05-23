import mongoose from 'mongoose';

//create schema
var LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const League = mongoose.models.League || mongoose.model('League', LeagueSchema);

export default League;
