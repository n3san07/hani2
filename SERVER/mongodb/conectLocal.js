const port = process.env.PORT || 3001;
import mongoose from "mongoose";
const mongodbUrl = "mongodb://127.0.0.1:27017/FinalProject";

export const mongoConectLocally = () => {
  mongoose
    .connect(mongodbUrl, {})
    .then((result) => {
      console.log("\x1b[33m%s\x1b[0m", `conected to mongo local server`);
    })
    .catch((err) => {
      console.log(err);
    });
};
