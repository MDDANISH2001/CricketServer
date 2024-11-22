import express from 'express';
import { createTeam, updateTeam, getTeam, getAllTeams, deleteTeam } from "../controller/teamController";

const teamRoutes = express.Router();

teamRoutes.post('/', createTeam);
teamRoutes.put('/:id', updateTeam);
teamRoutes.get('/:id', getTeam);
teamRoutes.get('/', getAllTeams);
teamRoutes.delete('/:id', deleteTeam);

export default teamRoutes;
