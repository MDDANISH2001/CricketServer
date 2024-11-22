import express from 'express';
import { createPlayer, updatePlayer, getPlayer, getAllPlayers, getPlayersByTeamId, createMultiplePlayers } from '../controller/playerController';

const playerRoutes = express.Router();

playerRoutes.get('/getByTeamId', getPlayersByTeamId);
playerRoutes.post('/', createPlayer);
playerRoutes.put('/:id', updatePlayer);
playerRoutes.get('/:id', getPlayer);
playerRoutes.get('/', getAllPlayers);
playerRoutes.post('/addMultiplePlayers', createMultiplePlayers);

export default playerRoutes;
