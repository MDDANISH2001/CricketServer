import { Request, Response } from 'express';
import { Player } from '../tableSchema/playerSchema';
import mongoose from 'mongoose';

// Create a new player
export const createPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validation (example: check for required fields)
    const { playerId, name, teamId, role } = req.body;
    if (!playerId || !name || !teamId || !role) {
      res.status(400).json({ message: "All fields are required (playerId, name, teamId, role)" });
      return 
    }

    // Check for duplicate playerId
    const existingPlayer = await Player.findOne({ playerId });
    if (existingPlayer) {
      res.status(400).json({ message: "Player with this playerId already exists" });
      return 
    }

    // Create and save player
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update player details
export const updatePlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validation for required fields in updates (optional)
    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: "No updates provided" });
      return 
    }

    const updatedPlayer = await Player.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedPlayer) {
      res.status(404).json({ message: "Player not found" });
      return 
    }

    res.status(200).json(updatedPlayer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get details of a single player
export const getPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if `id` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid player ID format" });
      return 
    }

    const player = await Player.findById(id);
    if (!player) {
      res.status(404).json({ message: "Player not found" });
      return 
    }

    res.status(200).json(player);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all players
export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const { teamId, role, limit, page } = req.query;

    // Filters
    const filters: any = {};
    if (teamId) filters.teamId = teamId as string;
    if (role) filters.role = role as string;

    // Pagination
    const pageLimit = parseInt(limit as string) || 10;
    const currentPage = parseInt(page as string) || 1;

    const players = await Player.find(filters)
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);

    res.status(200).json(players);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlayersByTeamId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamId, role, isOut } = req.query;

    if (!teamId) {
      res.status(400).json({ message: "teamId is required" });
      return 
    }

    // Build query
    const query: any = { teamId: teamId as string };
    if (role) query.role = role as string;
    if (isOut !== undefined) query.isOut = isOut === "true";

    const players = await Player.find(query);

    if (!players.length) {
      res.status(404).json({ message: `No players found for teamId: ${teamId}` });
      return 
    }

    res.status(200).json(players);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createMultiplePlayers = async (req: Request, res: Response) => {
  try {
    const players = req.body; // Expecting an array of player objects
    console.log('players :', players);
    const createdPlayers = await Player.insertMany(players);
    res.status(201).json(createdPlayers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
