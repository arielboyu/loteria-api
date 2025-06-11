import { Router } from "express";

import { AuthController } from "../controllers";
import { authValidator } from "../validators";
import { asyncHandler } from "../middlewares/handlers.middleware";

const router = Router();

router.post( "/send-verification", authValidator.login, asyncHandler( AuthController.sendVerification ) );

export default router;

