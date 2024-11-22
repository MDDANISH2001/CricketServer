import { Request, Response } from 'express';
import { Match } from '../tableSchema/matchSchema';

export const startMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { matchId } = req.body;

    if (!matchId) {
      res.status(400).json({ message: "Match ID is required" });
      return;
    }

    // Find the match and update the status
    const match = await Match.findOneAndUpdate(
      { matchId },
      { $set: { status: "In Progress", currentInnings: 1, currentScore: { runs: 0, wickets: 0, overs: 0 } } },
      { new: true }
    );

    if (!match) {
      res.status(404).json({ message: "Match not found" });
      return;
    }

    res.status(200).json({ message: "Match started successfully", match });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMatchData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { matchId } = req.params;

    if (!matchId) {
      res.status(400).json({ message: "Match ID is required" });
      return;
    }

    // Fetch the match and populate teams and balls
    const match = await Match.findOne({ matchId })
      .populate("teams.battingTeam")
      .populate("teams.bowlingTeam")
      .populate("balls");

    if (!match) {
      res.status(404).json({ message: "Match not found" });
      return;
    }

    res.status(200).json(match);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const createMatch = async (req: Request, res: Response) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMatch = async (req: Request, res: Response): Promise<void> =>{
  try {
    const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMatch) {res.status(404).json({ message: 'Match not found' }); return}
    res.status(200).json(updatedMatch);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      res.status(404).json({ message: 'Match not found' });
      return
    } 
    res.status(200).json(match);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMatches = async (_req: Request, res: Response) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);
    if (!deletedMatch) {
      res.status(404).json({ message: 'Match not found' });
      return;
    }
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
