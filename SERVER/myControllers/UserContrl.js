import express from "express";
import UserModel from "../models/modelUsers.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const creatToken = (user) => {
  const AnalysedUsrer = {
    id: user._id,
    Name: user.Name,
    Picture: user.Picture,
    Email: user.Email,
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
  };

  return jwt.sign({ AnalysedUsrer }, process.env.SECRET, { expiresIn: "3d" });
};
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
const EmailRegex =
  /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

function validatePassword(x) {
  return passwordRegex.test(x);
}
function validateEmail(x) {
  return EmailRegex.test(x);
}

export const Register = asyncHandler(async (req, res) => {
  const Email = req.body.Email;
  const Name = req.body.Name;
  const Password = req.body.Password;

  if (!Email || !Password) {
    return res.status(404).json({ message: "Data Is not full" });
  }

  if (!validatePassword(Password)) {
    return res.status(404).json({ message: "Password validaiton gone wrong" });
  }

  if (!validateEmail(Email)) {
    return res.status(404).json({ message: "Email validaiton gone wrong" });
  }

  try {
    const userExists = await UserModel.findOne({ Email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await UserModel.create({
      Email,
      Name,
      Password: hashedPassword,
    });
    const token = creatToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
});

export const LogIn = async (req, res) => {
  const { Email, Password } = req.body;
  console.log(req.body.user);

  if (!Email || !Password) {
    return res.status(404).json({ message: "Data Is not full" });
  }
  if (!validatePassword(Password)) {
    return res.status(404).json({ message: "password is not vaild" });
  }

  if (!validateEmail(Email)) {
    return res.status(404).json({ message: "email is not vaild" });
  }
  try {
    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email Or Password Are Not Correct" });
    }

    const match = await bcrypt.compare(Password, user.Password);

    if (!match) {
      return res
        .status(404)
        .json({ message: "Email Or Password Are Not Correct" });
    }
    const token = creatToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getUserData = async (req, res) => {
  if (!req.header("Authorization")) {
    console.log(req.header("Authorization"));
    return res.status(404).json({ message: "NO Authorization Found " });
  }
  const token = req.header("Authorization").split(" ")[1]; // Extract the token

  const userId = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      // Handle invalid token
      return res.status(404).json({ message: "Invalid token" });
    }
    return decoded.AnalysedUsrer.id;
  });

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    res.status(200).json({ user });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};
