import express from "express";
export const usersRoutes = express.Router();
import { Register,LogIn,getUserData,EditUserData } from "../myControllers/UserContrl.js";
import authenticateToken from "../config/authCheck.js";

usersRoutes.post("/register", Register);
usersRoutes.post("/login", LogIn);
usersRoutes.get("/getUserData",authenticateToken, getUserData);
usersRoutes.post("/EditUserData",authenticateToken, EditUserData);



