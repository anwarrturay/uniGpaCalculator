import express from 'express';
<<<<<<< HEAD
import { calculateGPA } from '../controllers/gpaController.js';
import { saveCalculation } from '../controllers/gpaController.js';
=======
import {calculateGPA} from '../controller/gpaController.js';
>>>>>>> 6757b83e68a4cc68e544ff83dcfdf5473e633d77
const router = express.Router();

router.post('/calculate', calculateGPA);
export default router;