import { Request, Response } from 'express';
import { Ball } from '../tableSchema/ballSchema';
import { Match } from '../tableSchema/matchSchema';
import { Player } from '../tableSchema/playerSchema';

export const updateGameData = async (req: Request, res: Response) => {
  try {
    console.log('req.body :', req.body.data);
    const { ball, match, batsman, bowler } = req.body.data;

    // Check if the ball exists
    const existingBall = await Ball.findOne({ ballId: ball.ballId });

    if (existingBall) {
      // Update existing ball
      await Ball.findOneAndUpdate(
        { ballId: ball.ballId },
        { $set: ball },
        { new: true }
      );
    } else {
      // Save the new ball data
      const newBall = new Ball(ball);
      await newBall.save();

      // Update match data to link the new ball
      await Match.findOneAndUpdate(
        { matchId: match.matchId },
        {
          $set: {
            currentScore: match.currentScore,
            extras: match.extras,
          },
          $push: { balls: newBall._id }, // Link ball to the match
        },
        { new: true }
      );
    }

    // Update batsman stats (if applicable)
    if (batsman) {
      await Player.findOneAndUpdate(
        { playerId: batsman.playerId },
        {
          $set: {
            "stats.batting.runs": batsman.stats.batting.runs,
            "stats.batting.ballsFaced": batsman.stats.batting.ballsFaced,
            "stats.batting.fours": batsman.stats.batting.fours,
            "stats.batting.sixes": batsman.stats.batting.sixes,
            "stats.batting.strikeRate": batsman.stats.batting.strikeRate,
          },
        },
        { new: true }
      );
    }

    // Update bowler stats
    await Player.findOneAndUpdate(
      { playerId: bowler.playerId },
      {
        $set: {
          "stats.bowling.runsConceded": bowler.stats.bowling.runsConceded,
          "stats.bowling.wides": bowler.stats.bowling.wides,
          "stats.bowling.overs": bowler.stats.bowling.overs,
          "stats.bowling.economyRate": bowler.stats.bowling.economyRate,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Game data updated successfully" });
  } catch (error: any) {
    console.error("Error updating game data:", error);
    res.status(500).json({ message: error.message });
  }
};
