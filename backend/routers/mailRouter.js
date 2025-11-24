import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

// Configure the transporter
// For dev, we use Ethereal (fake email). For real: use Gmail/Outlook settings
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'joshua.stokes@ethereal.email',
        pass: '5R1XgK8X2tZqQz1y1A'
    }
});

router.post("/api/send-welcome", async (req, res) => {
    const { email } = req.body;

    try {
        await transporter.sendMail({
            from: '"Node Course" <admin@nodecourse.com>',
            to: email,
            subject: "Welcome!",
            text: "Welcome to our platform. You have successfully signed up.",
            html: "<b>Welcome to our platform.</b> You have successfully signed up."
        });
        res.send({ message: "Email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to send email" });
    }
});

export default router;