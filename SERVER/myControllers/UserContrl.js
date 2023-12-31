import express from "express";
import UserModel from "../models/modelUsers.js";
import ResidencyModel from "../models/modelResidency.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/nodMailer.js";
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
const phoneNumberRegex = /^[0-9]{10}$/;

// Function to validate a phone number

function validatePassword(x) {
  return passwordRegex.test(x);
}
function validateEmail(x) {
  return EmailRegex.test(x);
}
function isValidPhoneNumber(x) {
  return phoneNumberRegex.test(x);
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
    res.status(404).json({ message: error.message });
  }
});

export const LogIn = async (req, res) => {
  const { Email, Password } = req.body;

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
    res.status(404).json({ message: error.message });
  }
};
export const getUserData = async (req, res) => {
  if (!req.header("Authorization")) {
    return res.status(404).json({ message: "No Authorization Found" });
  }
  const token = req.header("Authorization").split(" ")[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.AnalysedUsrer.id;
    if (!userId) {
      return res.status(404).json({ message: "Invalid token1" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    user.Password = "^_^";
    res.status(200).json({ user });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token2" });
    } else {
      res.status(404).json({ message: error.message });
    }
  }
};

export const getUser = async (req, res) => {
  const user = req.body.user;
  if (!user) {
    return res.status(404).json({ message: "no id found " });
  }
  try {
    res.status(200).json({ Name: user.Name, Picture: user.Picture });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const EditUserData = async (req, res) => {
  if (!req.body) {
    return res.status(401).json({ message: "no data found" });
  }
  const { Name, Email, Address, AboutMe, Phone, Picture, oldEmail } =
    req.body.data;
  if (!validateEmail(Email)) {
    return res.status(404).json({ message: "Email validaiton gone wrong" });
  }
  if (!oldEmail) {
    return res.status(404).json({ message: "no user found" });
  }
  if (!validateEmail(Email)) {
    return res.status(404).json({ message: "Email validaiton gone wrong" });
  }
  if (!isValidPhoneNumber(Phone)) {
    return res.status(404).json({ message: "Phone validaiton gone wrong" });
  }

  const defaultName = Name || " Name";
  const defaultEmail = Email || " Email";
  const defaultAddress = Address || " Address";
  const defaultAboutMe = AboutMe || " About Me";
  const defaultPhone = Phone || 0;
  const defaultPicture = Picture || " Picture";

  const updatedValues = {
    Name: defaultName,
    Email: defaultEmail,
    Address: defaultAddress,
    AboutMe: defaultAboutMe,
    Phone: defaultPhone,
    Picture: defaultPicture,
  };
  try {
    const user = await UserModel.findOne({ Email: oldEmail });
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    if (oldEmail != Email) {
      const checkifuserexist = await UserModel.findOne({ Email });
      if (checkifuserexist) {
        return res
          .status(404)
          .json({ message: "this Email is already in use" });
      }
    }
    // update the owner data for the residency table
    await ResidencyModel.updateMany({ Email: oldEmail }, { owner: Email });
    const userId = user._id.toString();
    // updata all the user info
    const final = await UserModel.findByIdAndUpdate(userId, updatedValues);
    if (!final) {
      res.status(404).json({ message: "somtheing went wrong" });
      return;
    }
    const newData = await UserModel.findOne({ Email: Email });
    if (!newData) {
      res.status(404).json({ message: "somtheing went wrong" });
      return;
    }

    const token = creatToken(newData._id);
    res.status(200).json({ user: newData, token: token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSellerInfo = async (req, res) => {
  const Email = req.body.data;
  if (!Email) {
    res.status(404).json({ message: "no email found" });
  }
  try {
    const user = await UserModel.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    user.Password = "^_^";
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAdminData = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(404).json({ message: "no email Found " });
  }
  //check if the user is an admin
  const user = await UserModel.findOne({ Email: email });
  if (!user.isAdmin) {
    res.status(404).json({ message: "you dont have a promisor" });
  }
  const PropertiesCount = await ResidencyModel.countDocuments();
  const Users = await UserModel.find({}, "Email Name _id Picture Phone").lean();

  Users.forEach((user) => {
    user.id = user._id.toString();
    delete user._id;
  });
  const finall = {
    PropertiesCount: PropertiesCount,
    UsersCount: Users.length,
    Users: Users,
  };

  res.status(200).json({ finall });
  try {
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const SendResetPasswordEmail = async (req, res) => {
  const Email = req.body.Email;
  if (!Email) {
    res.status(404).json({ message: "no email Found " });
  }

  try {
    const user = await UserModel.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ message: "Invalid user" });
    }
    const AnalysedUsrer = {
      id: user._id,
    };
    const token = await jwt.sign({ AnalysedUsrer }, process.env.SECRET, {
      expiresIn: "15m",
    });

    const dataToSend = {
      from: '"بيوتنا" <foo@example.com>',
      to: Email,
      subject: "Reset Password",
      text: "Reset Password",
      html: `
      <span>
      <h1>you have 15m to rest your password </h1>
      </br>
      <b>${req.headers.origin}/users/resetPassword/${user._id}/${token}</b> 
      </span>
      
      `,
    };
    sendEmail(dataToSend);
    res.status(200).json({ message: "check you email ^_^" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  if (!user && !newPassword) {
    return res.status(404).json({ message: "Invalid user" });
  }
  try {
    const newPassword = await bcrypt.hash(pass, 10);
    await UserModel.findOneAndUpdate(
      { Email: user.Email },
      { Password: newPassword }
    );
    res.status(200).json({ message: "success ^_^" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
