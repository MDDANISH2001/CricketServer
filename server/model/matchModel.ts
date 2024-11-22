import mongoose from "mongoose";

export interface IMatch extends Document {
  matchId: string;
  teams: {
    battingTeam: string;
    bowlingTeam: string;
  };
  currentInnings: number;
  overs: number;
  balls: mongoose.Types.ObjectId[]; // References to the Ball model
  currentScore: {
    runs: number;
    wickets: number;
    overs: number;
    ballsInCurrentOver: number;
  };
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    overthrows: number;
  };
  result: {
    winner: string | null;
    margin: string | null;
  };
  status: "Not Started" | "In Progress" | "Completed";
}
