import mongoose, { Schema, Document, Model } from "mongoose";
import { IPlayer } from "../model/playerModel";
  
  const PlayerSchema: Schema = new Schema(
    {
      playerId: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      teamId: { type: String, required: true },
      role: {
        type: String,
        enum: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"],
        required: true,
      },
      isOut: { type: Boolean, default: false }, // Indicates if the player is out
      stats: {
        batting: {
          runs: { type: Number, default: 0 },
          ballsFaced: { type: Number, default: 0 },
          fours: { type: Number, default: 0 },
          sixes: { type: Number, default: 0 },
          strikeRate: { type: Number, default: 0 },
        },
        bowling: {
          overs: { type: Number, default: 0 },
          maidens: { type: Number, default: 0 },
          runsConceded: { type: Number, default: 0 },
          wickets: { type: Number, default: 0 },
          noBalls: { type: Number, default: 0 },
          wides: { type: Number, default: 0 },
          economyRate: { type: Number, default: 0 },
        },
        fielding: {
          catches: { type: Number, default: 0 },
          stumpings: { type: Number, default: 0 },
        },
      },
    },
    { timestamps: true }
  );
  
  export const Player: Model<IPlayer> = mongoose.model<IPlayer>("Player", PlayerSchema);
  