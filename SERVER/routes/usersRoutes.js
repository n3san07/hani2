import express from "express";
export const usersRoutes = express.Router();
import { Register,LogIn,getUserData,EditUserData,getSellerInfo,getAdminData } from "../myControllers/UserContrl.js";
import authenticateToken from "../config/authCheck.js";

usersRoutes.post("/register", Register);
usersRoutes.post("/login", LogIn);
usersRoutes.get("/getUserData",authenticateToken, getUserData);
usersRoutes.post("/EditUserData",authenticateToken, EditUserData);
usersRoutes.post("/getSellerInfo",authenticateToken, getSellerInfo);
usersRoutes.post("/getAdminData",authenticateToken, getAdminData);





