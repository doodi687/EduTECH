const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: process.env.MAIL_PORT || 465,   // 465 (SSL) is safer for Gmail
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS, // your Gmail App Password
      },
    });

    const info = await transporter.sendMail({
      from: `"EduTech" <${process.env.MAIL_USER}>`, // Gmail must match MAIL_USER
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Mail sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Error while sending mail:", error.message);
    throw error;
  }
};

module.exports = mailSender;
