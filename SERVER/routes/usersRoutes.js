import express from "express";
export const usersRoutes = express.Router();
import { Register,LogIn,getUserData,EditUserData,getSellerInfo,getAdminData,SendResetPasswordEmail,updatePassword,getUser } from "../myControllers/UserContrl.js";
import authenticateToken from "../config/authCheck.js";

usersRoutes.post("/register", Register);
usersRoutes.post("/login", LogIn);
usersRoutes.get("/getUserData",authenticateToken, getUserData);
usersRoutes.post("/EditUserData",authenticateToken, EditUserData);
usersRoutes.post("/getSellerInfo",authenticateToken, getSellerInfo);
usersRoutes.post("/getAdminData",authenticateToken, getAdminData);
usersRoutes.post("/SendResetPasswordEmail", SendResetPasswordEmail);
usersRoutes.patch("/updatePassword",authenticateToken ,updatePassword);
usersRoutes.get("/getUser",authenticateToken, getUser);







