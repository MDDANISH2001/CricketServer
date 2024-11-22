import mongoose from "mongoose";

export interface IBall extends Document {
    ballId: string;
    matchId: mongoose.Types.ObjectId; // Reference to Match
    overNumber: number;
    ballNumberInOver: number;
    batsman: string; // Player ID
    nonStriker: string; // Player ID
    bowler: string; // Player ID
    runs: number;
    extras: {
      type: "Wide" | "No Ball" | "Bye" | "Leg Bye" | "Overthrow" | null;
      runs: number;
    } | null;
    wicket: {
      isWicket: boolean;
      type: "Bowled" | "Caught" | "Run Out" | "Stumped" | "Hit Wicket" | null;
      playerOut: string | null; // Player ID
      fielder: string | null; // Player ID
    } | null;
  }
