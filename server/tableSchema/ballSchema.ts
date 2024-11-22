import mongoose, { Schema, Document, Model } from "mongoose";
import { IBall } from "../model/ballModel";
  
  const BallSchema: Schema = new Schema(
    {
      ballId: { type: String, required: true, unique: true },
      matchId: { type: String, required: true },
      overNumber: { type: Number, required: true },
      ballNumberInOver: { type: Number, required: true },
      batsman: { type: String, required: true },
      nonStriker: { type: String, required: true },
      bowler: { type: String, required: true },
      runs: { type: Number, default: 0 },
      extras: {
        type: {
          type: String,
          enum: ["Wide", "No Ball", "Bye", "Leg Bye", "Overthrow"],
        },
        runs: { type: Number, default: 0 },
      },
      wicket: {
        isWicket: { type: Boolean, default: false },
        type: {
          type: String,
          enum: ["Bowled", "Caught", "Run Out", "Stumped", "Hit Wicket"],
          default: null,
        },
        playerOut: { type: String, default: null },
        fielder: { type: String, default: null },
      },
    },
    { timestamps: true }
  );
  
  export const Ball: Model<IBall> = mongoose.model<IBall>("Ball", BallSchema);
  