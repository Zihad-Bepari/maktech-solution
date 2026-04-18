import database  from "../../database/db.js";
import bcrypt from "bcrypt";
import { generatePasswordResetToken } from "../../utils/generatePasswordToken.js";
import { generateEmailTemplate } from "../../utils/generateEmailTemplate.js";
import { sendEmail } from "../../utils/sendEmail.js";
import axios from "axios";
import { sendOTPEmail } from "../../utils/sendotp.js";


export const signUpService = async (data,res,nex) => {
     const { name,email,password } = data;

     const existingUser = await database.query(
          "SELECT * FROM users WHERE email = $1", 
          [email]
     );
     if(existingUser.rows.length > 0){
          return res.status(400).json({ message: "User already exists" });
     }
     
     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = await database.query(
          "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
          [name,email,hashedPassword]
     );
       await database.query(
        "INSERT INTO user_settings (user_id) VALUES ($1)",
        [newUser.rows[0].id]
    );

     return newUser.rows[0];
};

export const signInService = async (data) => {

     const { email, password } = data;

     const user = await database.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
     );

     if (user.rows.length === 0) {
          throw new Error("Invalid email");
     }

     const validPassword = await bcrypt.compare(password, user.rows[0].password);

     if (!validPassword) {
          throw new Error("Invalid password");
     }
     const settingsRes = await database.query(
        "SELECT * FROM user_settings WHERE user_id=$1",
        [user.rows[0].id]
    );
    const settings = settingsRes.rows[0];
    if (settings.two_factor_auth==true) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 5*60*1000); 

        // Save OTP in user_settings
        await database.query(
            "UPDATE user_settings SET otp_code=$1, otp_expires=$2 WHERE user_id=$3",
            [otp, expires, settings.user_id]
        );

        await sendOTPEmail(user.rows[0].email, otp);

        return {
            requires2FA: true,
            message: "OTP sent to your email",
            userId: user.rows[0].id
        };
    }

     await database.query(
          "UPDATE users SET status = $1 WHERE email = $2",
          ["Active", email]
     );
     const updatedUser = await database.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
    );

     return updatedUser.rows[0];
};


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const forgotPasswordService = async (email) => {
  const userResult = await database.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userResult.rows.length === 0) {
    return { success: false, message: "User not found with this email" };
  }

  const user = userResult.rows[0];

  const otp = generateOTP();

  await database.query(
    `UPDATE user_settings 
     SET otp_code = $1, 
         otp_expires = NOW() + INTERVAL '10 minutes'
     WHERE user_id = $2`,
    [otp, user.id]
  );

  const message = `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset OTP",
      message
    });

    return {
      success: true,
      message: `OTP sent to ${user.email} successfully`
    };
  } catch (error) {
    await database.query(
      `UPDATE user_settings 
       SET otp_code = NULL, otp_expires = NULL 
       WHERE user_id = $1`,
      [user.id]
    );

    console.error("Email error:", error);

    return {
      success: false,
      message: "Failed to send OTP"
    };
  }
};


export const getGoogleUser = async (code) => {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

    const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        null,
        {
            params: {
                code: code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: `${BASE_URL}/auth/google/callback`,
                grant_type: "authorization_code",
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    const access_token = tokenResponse.data.access_token;

    const userResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );

    const googleUser = userResponse.data;

   
    const existingUser = await database.query(
        "SELECT * FROM users WHERE email = $1",
        [googleUser.email]
    );

    if (existingUser.rows.length > 0) {
        return existingUser.rows[0];
    }

    const username = googleUser.email.split("@")[0] + "_" + Date.now();

    const dummyPassword = "GOOGLE_AUTH_USER";

    const newUser = await database.query(
        `INSERT INTO users (name,email,username,password,profile_image_url)
         VALUES ($1,$2,$3,$4,$5)
         RETURNING *`,
        [
            googleUser.name,
            googleUser.email,
            username,
            dummyPassword,
            JSON.stringify({ url: googleUser.picture })
        ]
    );

    return newUser.rows[0];

}


export const verifyOTPService = async (userId, otp) => {
    const settingsRes = await database.query(
        "SELECT * FROM user_settings WHERE user_id=$1",
        [userId]
    );
    const settings = settingsRes.rows[0];

    if (!settings || !settings.otp_code || settings.otp_expires < new Date()) {
        throw new Error("OTP expired or not generated");
    }

    if (settings.otp_code !== otp) throw new Error("Invalid OTP");

    await database.query(
        "UPDATE users SET status='ACTIVE' WHERE id=$1",
        [userId]
    );

    await database.query(
        "UPDATE user_settings SET otp_code=NULL, otp_expires=NULL WHERE user_id=$1",
        [userId]
    );

    const userRes = await database.query(
        "SELECT * FROM users WHERE id=$1",
        [userId]
    );

    return userRes.rows[0];
};

