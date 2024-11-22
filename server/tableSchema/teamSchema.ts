import mongoose, { Schema, Document, Model } from "mongoose";
import { ITeam } from "../model/teamModel";
  
  const TeamSchema: Schema = new Schema(
    {
      teamId: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
      stats: {
        matchesPlayed: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        ties: { type: Number, default: 0 },
        totalRuns: { type: Number, default: 0 },
        totalWickets: { type: Number, default: 0 },
        extras: {
          wides: { type: Number, default: 0 },
          noBalls: { type: Number, default: 0 },
          byes: { type: Number, default: 0 },
          legByes: { type: Number, default: 0 },
          overthrows: { type: Number, default: 0 },
        },
      },
    },
    { timestamps: true }
  );
  
  export const Team: Model<ITeam> = mongoose.model<ITeam>("Team", TeamSchema);
  