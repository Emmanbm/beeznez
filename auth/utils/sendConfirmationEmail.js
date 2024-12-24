const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true pour le port 465, false pour le port 587
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = async (to, token) => {
  const link = `${process.env.FRONTEND_DOMAIN}/confirm-email?token=${token}`;
  console.log(process.env.EMAIL_USERNAME, to, link);

  await transporter.sendMail({
    from: `"BeezNez Support" <${process.env.EMAIL_USERNAME}>`,
    to: to,
    subject: "Confirmation de votre compte BeezNez",
    html: `
      <h1>Bienvenue sur BeezNez !</h1>
      <p>Merci de rejoindre notre communauté. Pour confirmer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
      <a href="${link}" style="display: inline-block; background-color: #FFD700; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmer mon compte</a>
      <p>Ce lien expirera dans 1 heure.</p>
      <p>Si vous n'avez pas demandé la création de ce compte, ignorez simplement cet e-mail.</p>
    `,
  });
};

module.exports = sendConfirmationEmail;
