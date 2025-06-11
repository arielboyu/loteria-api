import { ValidationChain, body } from "express-validator";
import { RequestHandler } from "express-serve-static-core";
import { validateErrors } from "../middlewares";
import { existsMail } from "../helpers/db-validator";


const email: ValidationChain = body( "email" ). trim().isEmail()
  .withMessage( "No ingresó un formato de mail válido." )
  .optional().custom( existsMail );


export const login: ValidationChain|RequestHandler[] = [
  email,
  body( "email" ).not().isEmpty().withMessage( "El email es requerido." ),
  validateErrors
];