import { Request } from "express";

export interface AuthCode {
    email: string;
}

export interface AuthCodeRequest extends Request {
    body: AuthCode;
}
