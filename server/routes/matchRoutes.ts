import express from 'express';
import { createMatch, updateMatch, getMatch, getAllMatches, deleteMatch, startMatch, getMatchData } from '../controller/matchController';

const matchRoutes = express.Router();
matchRoutes.post('/start', startMatch); // Endpoint to start the match
matchRoutes.get('/:matchId', getMatchData); // Endpoint to fetch match data
matchRoutes.post('/createMatch', createMatch);
matchRoutes.put('/:id', updateMatch);
matchRoutes.get('/:id', getMatch);
matchRoutes.get('/', getAllMatches);
matchRoutes.delete('/:id', deleteMatch);

export default matchRoutes;
