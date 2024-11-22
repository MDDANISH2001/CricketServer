import express, { Router } from "express";
import ballRoutes from './ballRoutes';
import matchRoutes from './matchRoutes';
import playerRoutes from './playerRoutes';
import teamRoutes from './teamRoutes';
import { updateGameData } from "../controller/updateGameData";

const cricketRoutes: Router = express.Router();

cricketRoutes.use('/balls', ballRoutes);
cricketRoutes.use('/matches', matchRoutes);
cricketRoutes.use('/players', playerRoutes);
cricketRoutes.use('/teams', teamRoutes);
cricketRoutes.put('/updateGameData', updateGameData);

export default cricketRoutes;