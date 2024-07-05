import express, { Router } from 'express';
import AuthController from '../controllers/authController';

const authRoutes: Router = express.Router();

authRoutes.post("/login", AuthController.authUser);

export default authRoutes;