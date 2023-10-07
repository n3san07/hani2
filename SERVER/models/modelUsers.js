import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Picture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    },
    Address: {
      type: String,
      default: "",
    },
    AboutMe: {
      type: String,
      default: "",
    },
    Phone: {
      type: Number,
      default: "",
    },
    isBusiness: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const UserModel = mongoose.model("HouseAPPUsers", userSchema);
export default UserModel;
