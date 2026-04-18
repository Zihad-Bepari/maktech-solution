export const generateEmailTemplate = (resetPasswordUrl) => {
    return `
      <div style="background-color: #FFF5F2; padding: 40px 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 40px rgba(255, 69, 0, 0.08); overflow: hidden; border: 1px solid #FFD8CC;">
    
    <div style="height: 8px; background: linear-gradient(90deg, #FF4500, #FF8C00);"></div>

    <div style="padding: 45px 35px 35px;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #FF4500; margin: 0; font-size: 30px; font-weight: 900; letter-spacing: -1.5px;">Reddittasks</h1>
      </div>

      <div style="text-align: center;">
        <h2 style="color: #2D3436; font-size: 22px; font-weight: 700; margin-bottom: 12px;">Reset Your Password</h2>
        <p style="color: #636E72; font-size: 15px; line-height: 1.6;">
          Someone requested a new password for your account. If this was you, click the button below to secure your profile.
        </p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
        <a href="${resetPasswordUrl}" 
           style="display: inline-block; padding: 16px 45px; background: linear-gradient(135deg, #FF4500 0%, #FF7033 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 17px; font-weight: 700; box-shadow: 0 8px 25px rgba(255, 69, 0, 0.25);">
          Reset Password
        </a>
      </div>

      <div style="background-color: #FFF9F7; border-radius: 15px; padding: 20px; border: 1px solid #FFE8E0; text-align: center;">
        <p style="margin: 0; font-size: 14px; color: #555; line-height: 1.5;">
          <strong style="color: #FF4500;">Security Notice:</strong> <br>
          This link expires in <b style="color: #FF4500;">10 minutes</b>. <br>
          If you didn't request this, no action is needed.
        </p>
      </div>
    </div>

    <footer style="background-color: #2D3436; padding: 35px 25px; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #ffffff; font-weight: 500;">Thank you for being with us,<br><span style="color: #FF8C00; font-weight: 800; font-size: 16px;">Reddittasks Team</span></p>
      <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #B2BEC3; text-transform: uppercase; letter-spacing: 1.5px;">
        Automated Security Email • Do Not Reply
      </div>
    </footer>
  </div>
</div>
    `;
}   