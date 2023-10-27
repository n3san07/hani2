import express from "express";
import ResidencyModel from "../models/modelResidency.js";
import UserModel from "../models/modelUsers.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const addResidency = asyncHandler(async (req, res) => {
  const obj = {
    title: req.body.data.title,
    phone: req.body.data.phone,
    city: req.body.data.city,
    price: req.body.data.price,
    street: req.body.data.street,
    owner: req.body.data.owner,
    ownerName: req.body.data.ownerName,
    info: req.body.data.info,
    flexiblePrice: req.body.data.flexiblePrice,
    ResidencyType: req.body.data.ResidencyType,
    MapPosition: req.body.data.MapPosition,
    imgsUrl: req.body.data.imgsUrl,
    facilities: {
      size: req.body.data.facilities.size,
      parking: req.body.data.facilities.parking,
      bedRoom: req.body.data.facilities.bedRoom,
      bathRoom: req.body.data.facilities.bathRoom,
    },
  };
  try {
    const newResidency = await ResidencyModel.create(obj);
    res.send(newResidency);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});
export const getallResidency = asyncHandler(async (req, res) => {
  try {
    const ResidencysFromDB = await ResidencyModel.find({}).sort({ _id: -1 });
    res.status(200).json(ResidencysFromDB);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});

export const getSwiperProperties = asyncHandler(async (req, res) => {
  try {
    const ResidencysFromDB = await ResidencyModel.find({})
      .sort({ _id: -1 }) // Sort by createdAt field in descending order
      .limit(8); // Limit the results to 8 records

    res.status(200).json(ResidencysFromDB);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getResidency = asyncHandler(async (req, res) => {
  const id = req.params["id"];
  if (!id) {
    res.status(404).json({ message: "no such Residency" });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "no such Residency" });
    }
    const ResidencysFromDB = await ResidencyModel.findById(id);

    if (!ResidencysFromDB) {
      res.status(404).json({ message: "no such Residency" });
    }
    res.status(200).json(ResidencysFromDB);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});

export const DeleteResidency = asyncHandler(async (req, res) => {
  const id = req.params["id"];
  if (!id) {
    res.status(404).json({ message: "no id found " });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "no such Residency" });
    }
    const deleteResidency = await ResidencyModel.findOneAndDelete({ _id: id });
    if (!deleteResidency) {
      res.status(404).json({ message: "no such Residency" });
    }
    res.status(200).json(deleteResidency);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});

export const likeResidency = asyncHandler(async (req, res) => {
  const ResidencyId = req.params["id"];
  const UserEmail = req.body.email;
  if (!ResidencyId || !UserEmail) {
    return res.status(404).json({ message: "data is req" });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(ResidencyId)) {
      return res.status(404).json({ message: "no such Residency" });
    }

    const checkResidency = await ResidencyModel.findById(ResidencyId);
    const checkUser = await UserModel.find({ Email: UserEmail });

    if (!checkResidency && !checkUser) {
      return res.status(404).json({ message: "data is not corect" });
    }
    if (checkResidency.favArray.includes(UserEmail)) {
      const unlikeResidency = checkResidency.favArray.filter(
        (x) => x !== UserEmail
      );
      checkResidency.favArray = unlikeResidency;
      checkResidency.save();
      res.status(200).json({ message: "success unlike Residency" });
      return;
    }
    checkResidency.favArray = [...checkResidency.favArray, UserEmail];
    checkResidency.save();
    res.status(200).json({ message: "success like Residency" });
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});

export const getAllFavoriteToCheckLike = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(404).json({ message: "NO email Found" });
  }
  try {
    const checkUser = await UserModel.find({ Email: email });

    if (!checkUser) {
      return res.status(404).json({ message: "NO vaild User" });
    }
    const allLikedResidency = await ResidencyModel.find({
      favArray: { $in: [email] },
    });
    if (!allLikedResidency || allLikedResidency.length === 0) {
      return res.status(404).json({ message: "no Residency Found" });
    }
    const arr = [];
    allLikedResidency.map((x) => {
      arr.push(x._id);
    });
    res.send(arr);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});

export const getFilterProperties = asyncHandler(async (req, res) => {
  try {
    const UrlQueryPrice = req.body.UrlQueryPrice || "";
    const UrlQueryCity = req.body.UrlQueryCity || "";
    const UrlQuerystate = req.body.UrlQuerystate || "";

    const maxPrice = parseFloat(UrlQueryPrice.split(",")[1]) || 0;
    const minPrice = parseFloat(UrlQueryPrice.split(",")[0]) || 0;

    const filterCriteria = {};
    if (minPrice !== 0 || maxPrice !== 0) {
      filterCriteria.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (UrlQueryCity) {
      filterCriteria.city = UrlQueryCity;
    }
    if (UrlQuerystate) {
      filterCriteria.ResidencyType = UrlQuerystate;
    }

    const db =
      Object.keys(filterCriteria).length === 0
        ? await ResidencyModel.find()
        : await ResidencyModel.find(filterCriteria).exec();

    res.status(200).json(db);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getMyResidences = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(404).json({ message: "no Email Detected" });
    return;
  }
  try {
    const checkUser = await UserModel.find({ Email: email });

    if (!checkUser) {
      return res.status(404).json({ message: "NO vaild User" });
    }

    const db = await ResidencyModel.find({ owner: email });
    if (!db) {
      res.status(404).json({ message: "didnt find data!!" });
      return;
    }
    res.status(200).json(db);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});
export const getAllFavorite = asyncHandler(async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(404).json({ message: "NO email Found" });
  }
  try {
    const checkUser = await UserModel.find({ Email: email });

    if (!checkUser) {
      return res.status(404).json({ message: "NO vaild User" });
    }
    const allLikedResidency = await ResidencyModel.find({
      favArray: { $in: [email] },
    });
    if (!allLikedResidency || allLikedResidency.length === 0) {
      return res.status(400).json({ message: "You dont Have Any Likes" });
    }
    res.send(allLikedResidency);
  } catch (error) {
    res.status(404).json({ message: error._message });
  }
});
export const editResidency = asyncHandler(async (req, res) => {
  const id = req.body.data.id;

  const data = {
    title: req.body.data.title || "",
    phone: req.body.data.phone || "",
    city: req.body.data.city || "",
    price: req.body.data.price || "",
    ownerName: req.body.data.ownerName || "",
    info: req.body.data.info || "",
    ResidencyType: req.body.data.ResidencyType || "",
    facilities: {
      size: req.body.data.size || "",
      parking: req.body.data.parking || "",
      bedRoom: req.body.data.bedRoom || "",
      bathRoom: req.body.data.bathRoom || "",
    },
  };

  try {
    const isExist = await ResidencyModel.findById(id);
    if (!isExist) {
      res.status(404).json({ message: "NO Properties Found" });
      return;
    }
    const update = await ResidencyModel.findByIdAndUpdate(id, data);
    update.save();
    res.status(200).json({ message: "Editing Your Property Was A Success" });
  } catch (error) {
    res.status(404).json({ message: error._message });
    return;
  }
});
