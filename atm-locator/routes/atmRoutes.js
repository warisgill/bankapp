import express from 'express';
import {
  getATMs,
  addATM,
} from '../controllers/atmController.js';

const router = express.Router();

router.get('/', getATMs);
router.post('/add', addATM)

export default router;
