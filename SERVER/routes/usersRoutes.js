import express from "express";
export const usersRoutes = express.Router();
import { Register,LogIn,getUserData,EditUserData } from "../myControllers/UserContrl.js";

usersRoutes.post("/register", Register);
usersRoutes.post("/login", LogIn);
usersRoutes.get("/getUserData", getUserData);
usersRoutes.post("/EditUserData", EditUserData);



