import mongoose, { Schema, Document, Model } from "mongoose";
import { IMatch } from "../model/matchModel";

const MatchSchema: Schema = new Schema(
  {
    matchId: { type: String, required: true, unique: true },
    teams: {
      battingTeam: { type: String, required: true },
      bowlingTeam: { type: String, required: true },
    },
    currentInnings: { type: Number, required: true },
    overs: { type: Number, required: true },
    balls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ball" }],
    currentScore: {
      runs: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      overs: { type: Number, default: 0 },
      ballsInCurrentOver: { type: Number, default: 0 },
    },
    extras: {
      wides: { type: Number, default: 0 },
      noBalls: { type: Number, default: 0 },
      byes: { type: Number, default: 0 },
      legByes: { type: Number, default: 0 },
      overthrows: { type: Number, default: 0 },
    },
    result: {
      winner: { type: String, default: null },
      margin: { type: String, default: null },
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

export const Match: Model<IMatch> = mongoose.model<IMatch>("Match", MatchSchema);
