import express from "express";
import prisma from "./lib/prisma.js";
import { sendVerificationCode } from "./lib/emailService.js";

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🎰 Lotería API funcionando!",
    port: PORT
  });
});

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const verificationCodes = new Map();

app.post("/auth/send-verification", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: "Email es requerido" 
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Este email ya está registrado"
      });
    }

    const verificationCode = generateVerificationCode();
    
    verificationCodes.set(email, {
      code: verificationCode,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    const emailSent = await sendVerificationCode(email, verificationCode, name || 'Usuario');

    if (emailSent) {
      res.json({
        message: "Código de verificación enviado por email",
        email: email
      });
    } else {
      res.status(500).json({
        error: "Error enviando el email"
      });
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "Error interno del servidor" 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎰 Servidor en http://localhost:${PORT}`);
});