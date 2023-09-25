import express from "express";
export const ResidencyRoutes = express.Router();
import {
  addResidency,
  getallResidency,
  getResidency,
  DeleteResidency,
  getAllFavoriteToCheckLike,
  likeResidency,
  getFilterProperties,
  getSwiperProperties,
  getMyResidences,
  getAllFavorite,
  editResidency
} from "../myControllers/ResidencyContrl.js";
import authenticateToken from "../config/authCheck.js";


ResidencyRoutes.post("/addResidency",authenticateToken, addResidency);
ResidencyRoutes.get("/getallResidency", getallResidency);
ResidencyRoutes.get("/getSwiperProperties", getSwiperProperties);
ResidencyRoutes.post("/getMyResidences",authenticateToken, getMyResidences);
ResidencyRoutes.post("/getFilterProperties", authenticateToken,getFilterProperties);
ResidencyRoutes.get("/getResidency/:id", getResidency);
ResidencyRoutes.delete("/DeleteResidency", authenticateToken,DeleteResidency);
ResidencyRoutes.post("/getAllFavorite", authenticateToken,getAllFavorite);
ResidencyRoutes.patch("/likeResidency/:id",authenticateToken, likeResidency);
ResidencyRoutes.post("/checkLikeResidency",authenticateToken, getAllFavoriteToCheckLike);
ResidencyRoutes.post("/editResidency",authenticateToken, editResidency);



