import { Response } from "express";
import { AuthCodeRequest } from "../interfaces/auth.interface";
import { sendVerificationCode } from "../services/emailService";
import { CustomError } from "../helpers/customError.helpers";


function generateVerificationCode (): string {
  return Math.floor( 100000 + Math.random() * 900000 ).toString();
}

const verificationCodes = new Map();


export const sendVerification = async ( req: AuthCodeRequest, res: Response ): Promise<void> => {
  const { email } = req.body;

  const verificationCode = generateVerificationCode();

  verificationCodes.set( email, {
    code: verificationCode,
    expiresAt: Date.now() + 10 * 60 * 1000
  } );

  const emailSent = await sendVerificationCode( email, verificationCode, "Usuario" );

  if ( !emailSent ) throw new CustomError( "Error enviando el email.", 500 );

  res.status( 200 ).json( {
    message: "Código de verificación enviado por email",
    email: email
  } );
};