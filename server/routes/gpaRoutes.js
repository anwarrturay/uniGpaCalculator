import express from 'express';
import {calculateGPA} from '../controller/gpaController.js';
const router = express.Router();

router.post('/calculate', calculateGPA);

export default router;