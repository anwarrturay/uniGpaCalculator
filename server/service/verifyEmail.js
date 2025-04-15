const nodemailer = require("nodemailer")

const verifyEmail = async (to, subject, verificationLink)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    
        let mailOptions = {
            from: `"MiSkul app" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: `
                <div style="font-family: Montserrat, sans-serif; padding: 20px;">
                    <p style="font-size: 16px; color: #333;">
                        You have been sent a verification link to verify your email. Click the button below:
                    </p>
                    <button style="background-color: #070181; padding: 1rem 3rem; font-family: Montserrat, sans-serif;border:none; border-radius: 0.4rem">
                        <a href="${verificationLink}" style="color: #fff; font-weight: bold; text-decoration: none;">Verify Email</a>
                    </button>
                    <p style="font-size: 14px;">This link will expire in <strong>an hour</strong>.</p>
                    <p style="color: #999; font-size: 12px;">
                        This message was sent from ${process.env.CLIENT_URL}
                    </p>
                    <hr />
                </div>
            `
        }
    
        await transporter.sendMail(mailOptions)
        console.log("Verification Link sent Successfully: ", verificationLink)
    }catch(err){
        console.error("Error sending verifcation Link", {
            message: err.message,
            cause: err.cause
        })
    }

}



module.exports = verifyEmail