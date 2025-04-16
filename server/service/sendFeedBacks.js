const nodemailer = require("nodemailer")
require("dotenv").config();

const sendFeedBacks = async(email, issue, message)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    // Verify SMTP connection before sending email
    await transporter.verify();
    console.log("SMTP connection verified");

    let mailOptions = {
        from: `"User Feedback:" <${process.env.EMAIL_USER}>`,
        to: "anwarrturay03@gmail.com",
        replyTo: email,
        subject: `New Feedback - ${issue}`,
        html: `
            <h2>New Feedback Submitted</h2>
            <p><strong>Feedback Type:</strong> ${issue}</p>
            <p><strong>message:</strong></p>
            <p>${message}</p>
            <hr />`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Feedback email sent successfully.");
        return true;
    } catch (error) {
        console.error("Error sending feedback email:", error);
        return false;
    }
}

module.exports = sendFeedBacks;