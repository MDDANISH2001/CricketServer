import { Request, Response } from 'express';
import { Team } from '../tableSchema/teamSchema';

// Create a new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// Update team details
export const updateTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedteam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedteam) { res.status(404).json({ message: 'team not found' });return}
    res.status(200).json(updatedteam);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// Get details of a single team
export const getTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team)  {res.status(404).json({ message: 'team not found' });return}
    res.status(200).json(team);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all teams
export const getAllTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a team
export const deleteTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedteam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedteam) { res.status(404).json({ message: 'team not found' });return}
    res.status(200).json({ message: 'team deleted successfully' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
