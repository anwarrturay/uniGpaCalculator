import express from 'express';
import {calculateGPA} from '../controller/gpaController.js';
import { saveCalculation } from '../controller/gpaController.js';
const router = express.Router();

router.post('/calculate', calculateGPA);
router.post('/save', saveCalculation);
export default router;