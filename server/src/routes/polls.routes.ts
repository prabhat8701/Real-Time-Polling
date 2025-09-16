import { Router } from 'express';
import { createPoll, getPolls, getPollById } from '../controllers/polls.controller.js';
const router = Router();

router.post('/', createPoll);
router.get('/', getPolls);
router.get('/:id',getPollById);

export default router;
