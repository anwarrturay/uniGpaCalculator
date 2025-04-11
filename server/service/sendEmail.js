const nodemailer = require('nodemailer');
const path = require('path')
const sendEmail = async (to, subject, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_USER,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });

    const imageUrl = `http://localhost:5000/public/unimak.png`;

    let mailOptions = {
        from: `"MiSkul" <${process.env.EMAIL_USER}>`,
        to,
        subject: subject,
        html: `
            <div style="font-family: Montserrat, sans-serif; padding: 20px;">
                <div style="margin-bottom: 20px;">
                    <img src="${imageUrl}" alt="logo" width="80" />
                </div>
                <hr />
                <p style="font-size: 16px; color: #333;">
                    You have been sent a link to reset your password. Click the link below:
                </p>
                <button style="background-color: #070181; padding: 1rem 3rem; font-family: Montserrat, sans-serif;border:none; border-radius: 0.4rem">
                    <a href="${resetLink}" style="color: #fff; font-weight: bold; text-decoration: none;">Reset Password</a>
                </button>
                <p style="font-size: 14px;">This link will expire in <strong>an hour</strong>.</p>
                <p style="color: #999; font-size: 12px;">
                    This message was sent from ${process.env.CLIENT_URL}
                </p>
                <hr />
            </div>
        `,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (err) {
    console.error("Error sending email: ", err);
  }
};

module.exports = sendEmail;
