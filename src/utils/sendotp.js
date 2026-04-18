// otpEmail.js
import { sendEmail } from './sendEmail.js';

export const generateOTPTemplate = (otp) => {
    return `
    <div style="background-color: #F4FBF6; padding: 40px 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px rgba(34, 139, 34, 0.08); overflow: hidden; border: 1px solid #CDE9D6;">

    <div style="height: 8px; background: linear-gradient(90deg, #2E7D32, #66BB6A);"></div>

    <div style="padding: 45px 35px 35px;">

      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #2E7D32; margin: 0; font-size: 30px; font-weight: 900; letter-spacing: -1.5px;">
          Urban Farming Platform
        </h1>
      </div>

      <div style="text-align: center;">
        <h2 style="color: #2D3436; font-size: 22px; font-weight: 700; margin-bottom: 12px;">
          Your Login OTP
        </h2>

        <p style="color: #636E72; font-size: 15px; line-height: 1.6;">
          Use the OTP below to complete your login securely. This OTP is valid for <b>5 minutes</b>.
        </p>

        <h3 style="color: #2E7D32; font-size: 28px; font-weight: 900; margin: 20px 0;">
          ${otp}
        </h3>
      </div>

      <div style="background-color: #F1F8F4; border-radius: 15px; padding: 20px; border: 1px solid #D7EADF; text-align: center;">
        <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.5;">
          If you did not request this OTP, you can safely ignore this email.
        </p>
      </div>

    </div>

    <footer style="background-color: #1B3B2F; padding: 35px 25px; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: 500;">
        Thank you for being part of sustainable farming,<br>
        <span style="color: #66BB6A; font-weight: 800; font-size: 16px;">
          Urban Farming Platform Team
        </span>
      </p>

      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #B2C5BC; text-transform: uppercase; letter-spacing: 1.5px;">
        Automated Security Email • Do Not Reply
      </div>
    </footer>

  </div>
</div>
    `;
};

export const sendOTPEmail = async (toEmail, otp) => {
    const htmlTemplate = generateOTPTemplate(otp);
    await sendEmail({
        email: toEmail,
        subject: "Your Reddittasks OTP Code",
        message: htmlTemplate
    });
};