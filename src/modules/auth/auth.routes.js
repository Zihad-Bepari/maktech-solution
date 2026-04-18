import express from 'express';
import { signIn, signUp, forgotPassword, 
         googleAuthCallback, 
         verifyOTP,
        } from './auth.controller.js';
import { googleSignIn } from './auth.controller.js';
import { validateSigninData, validateSignupData,  } from './auth.validation.js';

const router = express.Router();

router.post("/signup",validateSignupData, signUp)
router.post("/signin",validateSigninData, signIn)

router.post("/signin/2fa", verifyOTP) 
router.post("/forgot", forgotPassword);

router.get("/google", googleSignIn);    
router.get("/google/callback", googleAuthCallback);


export default router;

