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
