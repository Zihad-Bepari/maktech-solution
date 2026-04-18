import { catchAsyncError } from "../../middlewares/catchAsyncError.js";
import { generateToken } from "../../utils/jwtToken.js";
import { signUpService, signInService, forgotPasswordService, 
    getGoogleUser, verifyOTPService, 
  } from "./auth.service.js";

export const signUp = catchAsyncError(async (req, res, next) => {

    const user = await signUpService(req.body);

    const token = generateToken(user);

    res
    .status(201)
    .cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user.id,
            fullname: user.name,
            email: user.email,
            role: user.role,
            status: user.status === "Active"
                ? "Inactive"
                : user.status
        },
        token,
    });

});

export const signIn = catchAsyncError(async (req, res,next) => {    
    const user = await signInService(req.body);
    
    if(user.requires2FA){
         return res.status(200).json({
            success: true,
            message: user.message,
            userId: user.userId
        });
    }

    const token = generateToken(user);

    res
    .status(201)
    .cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "User logged in successfully",
        user: {
            id: user.id,
            fullname: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        },
        token,
    });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    if (result.success) {
        return res.status(200).json(result);
    }

    if (result.message === "User not found with this email") {
        return res.status(404).json(result);
    }

    return res.status(500).json(result);
});

export const googleSignIn = catchAsyncError(async (req, res, next) => {
   
  const { GOOGLE_CLIENT_ID, BASE_URL } = process.env
  const redirectUri = `${BASE_URL}/auth/google/callback`;
  //console.log("Redirect URI:", redirectUri); // Debugging log
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
  res.redirect(googleAuthUrl);
});

export const googleAuthCallback = catchAsyncError(async (req, res, next) => {
    const { code } = req.query;
    if (!code) {
       return res.status(400).json({ 
        success: false, 
        message: "Code is required" 
    });}

    const googleUser = await getGoogleUser(code);
    if (!googleUser) {
        return res.status(400).json({ 
            success: false, 
            message: "Failed to authenticate with Google" 
        });
    }

    const token = generateToken(googleUser);

    res.status(200).json({
        success: true,
        message: "Google sign-in successful",
        user: {
            id: googleUser.id,
            fullname: googleUser.name,
            email: googleUser.email,
            username: googleUser.email.split("@")[0],
            status: "ACTIVE"
        },
        token,
    });
});

export const verifyOTP = catchAsyncError(async (req, res, next) => {
    const { userId, otp } = req.body;

    const user = await verifyOTPService(userId, otp);

    const token = generateToken(user);

    res
    .status(200)
    .cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
    .json({
        success: true,
        message: "Login successful",
        user: {
            id: user.id,
            fullname: user.name,
            email: user.email,
            status: user.status
        },
        token,
    });
});

