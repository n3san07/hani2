import jwt from "jsonwebtoken";
import UserModel from "../models/modelUsers.js";

const authenticateToken = async (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(404).json({ message: "NO Authorization Found " });
  }

  const token = req.header("Authorization").split(" ")[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.AnalysedUsrer.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default authenticateToken;
