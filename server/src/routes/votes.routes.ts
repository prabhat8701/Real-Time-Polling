import { Router } from 'express';
import { createVote } from '../controllers/votes.controller.js';

const router = Router();
router.post('/', createVote);

export default router;
