import { Request, Response } from 'express';
import { Ball } from '../tableSchema/ballSchema';

// Create a new ball
export const createBall = async (req: Request, res: Response) => {
  try {
    console.log('req.body :', req.body);
    const ball = new Ball(req.body);
    console.log('ball :', ball);
    await ball.save();
    res.status(201).json(ball);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update ball details
export const updateBall = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBall = await Ball.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBall) {
      res.status(404).json({ message: 'Ball not found' });
      return;
    } 
    res.status(200).json(updatedBall);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get details of a single ball
export const getBall = async (req: Request, res: Response): Promise<void> => {
  try {
    const ball = await Ball.findById(req.params.id);
    if (!ball) {
      res.status(404).json({ message: 'Ball not found' });
      return;
    } 
    res.status(200).json(ball);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all balls
export const getAllBalls = async (_req: Request, res: Response) => {
  try {
    const balls = await Ball.find();
    res.status(200).json(balls);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a ball
export const deleteBall = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBall = await Ball.findByIdAndDelete(req.params.id);
    if (!deletedBall) {
      res.status(404).json({ message: 'Ball not found' });
      return;
    }
    res.status(200).json({ message: 'Ball deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
