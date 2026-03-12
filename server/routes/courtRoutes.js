import express from 'express';
import auth from '../middlewares/auth.js';
import {registerCourt, checkCourt, getRegisteredCourt} from '../controllers/registerCourt.js';
import { createCourt, getCourt, getOwnerCourts, toggleCourtAvailability } from '../controllers/court.controller.js';
import upload from '../middlewares/multer.js';



const router = express.Router();

router.post('/register-court', auth, registerCourt)
router.get('/check-court', auth, checkCourt)
router.get('/get-registered-court', auth,  getRegisteredCourt)
router.post('/add-court', auth ,upload.array("images", 5), createCourt )
router.get('/get-owner-court', auth , getOwnerCourts )

router.get('/get-court', getCourt)
router.post('/toggle-availability', auth, toggleCourtAvailability  )


export default router