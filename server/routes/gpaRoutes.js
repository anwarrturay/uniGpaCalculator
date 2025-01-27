import express from 'express';
import { calculateGPA } from '../controllers/gpaController.js';
const router = express.Router();

router.post('/calculate', calculateGPA);
router.post('/save', saveCalculation);

export default router;