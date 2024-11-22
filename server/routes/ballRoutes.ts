import express from 'express';
import { createBall, updateBall, getBall, getAllBalls, deleteBall } from "../controller/ballController";

const ballRoutes = express.Router();

ballRoutes.post('/createBall', createBall);
ballRoutes.put('/updateBall:id', updateBall);
ballRoutes.get('/:id', getBall);
ballRoutes.get('/', getAllBalls);
ballRoutes.delete('/:id', deleteBall);

export default ballRoutes;
