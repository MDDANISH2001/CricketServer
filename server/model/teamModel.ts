import mongoose from "mongoose";

export interface ITeam extends Document {
  teamId: string;
  name: string;
  players: mongoose.Types.ObjectId[]; // References to Player model
  stats: {
    matchesPlayed: number;
    wins: number;
    losses: number;
    ties: number;
    totalRuns: number;
    totalWickets: number;
    extras: {
      wides: number;
      noBalls: number;
      byes: number;
      legByes: number;
      overthrows: number;
    };
  };
}