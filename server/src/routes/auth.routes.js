import { Router } from "express";

import prisma from "../db.js";

import {
    register,
    login,
    logout,
    verify,
  } from "../controllers/auth.controllers.js";
  import { validateSchema } from "../middlewares/validator.middleware.js";
  import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";

const router = Router()

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/auth/verify", verify);

router.get("/delete", async (req, res) => {
  await prisma.user.deleteMany();
})

export default router