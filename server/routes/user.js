import express from 'express';
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import auth from '../middlewares/auth.js';
import {getUser, storeRecentSearchCities} from '../controllers/getUser.js';
import logout from '../controllers/logout.js';
import getAccess from '../controllers/getAccess.js';
import forgotPassword from '../controllers/forgotPassword.js';
import verifyOtp from '../controllers/verifyotp.js';
import getTime from '../controllers/getTime.js';
import updatePassword from '../controllers/updatePaaword.js';
import protectReset from '../middlewares/resetauth.js'
import  upload from '../middlewares/multer.js';

const  router = express.Router();

router.post('/signup', upload.single("profilePicture")
  , register);
router.post('/login', login);
router.get('/profile', auth, getUser);
router.post('/store-recent-search', auth, storeRecentSearchCities);
router.get('/logout', logout);
router.get('/access', auth, getAccess);
router.get('/reset-access', protectReset, getAccess);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/otp/time', getTime);
router.post('/reset-password',protectReset, updatePassword);

export default router;