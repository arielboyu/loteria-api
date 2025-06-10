import nodemailer from 'nodemailer';

// Luego cambiar las credenciales por una app para loteria
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "travelgrinviajes@gmail.com",
    pass: "xgfw dzad edqw kjxh",
  },
});


export async function sendVerificationCode(email, code, userName = 'Usuario') {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 10px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .title { color: #014f8f; font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 30px; }
        .content { font-size: 16px; line-height: 1.6; color: #333; }
        .code-section { text-align: center; margin: 30px 0; }
        .code-label { color: #014f8f; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .code { font-size: 36px; font-weight: bold; color: #014f8f; letter-spacing: 8px; margin: 20px 0; }
        .warning { text-align: center; margin: 20px 0; font-weight: bold; }
        .instructions { margin: 30px 0; }
        .instructions ul { padding-left: 20px; }
        .instructions li { margin: 10px 0; font-weight: bold; }
        .footer { margin-top: 30px; font-size: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="https://i.ibb.co/fGSjQPVw/logo-loteria-removebg-preview-1.png" alt="Lotería de Córdoba" style="max-width: 200px;">
        </div>
        
        <h1 class="title">¡Hola ${userName}!</h1>
        
        <div class="content">
          <p>Te estamos enviando este código de 6 dígitos porque requeriste <strong>recuperar tu contraseña</strong> en la <strong>aplicación de la Lotería de Córdoba</strong>.</p>
          
          <p>Por favor, utiliza este código para garantizar que el proceso sea seguro.</p>
        </div>
        
        <div class="code-section">
          <div class="code-label">Tu código de 6 dígitos:</div>
          <div class="code">${code}</div>
        </div>
        
        <div class="warning">*** No compartas este código ***</div>
        
        <div class="instructions">
          <ul>
            <li>Regresa a la pantalla de logueo.</li>
            <li>Inserta un número en cada casillero.</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Esperamos verte nuevamente en la app!</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: '"Lotería de Córdoba" <travelgrinviajes@gmail.com>',
    to: email,
    subject: 'Código de seguridad',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email enviado a ${email}`);
    return true;
  } catch (error) {
    console.error('Error enviando email:', error);
    return false;
  }
}