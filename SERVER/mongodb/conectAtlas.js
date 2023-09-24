const port = process.env.PORT || 3001;
import mongoose from "mongoose";

export const mongoConectAtlas = () => {
  const password = process.env.PASSWORD;
  const DBUserName = process.env.DBUserName;

  if (!DBUserName && !password) {
    console.log(password);
    console.log("faild to connect DB password and username wrong");
  }

  const uri = `mongodb+srv://${DBUserName}:${password}@cardapp.vrq9hh9.mongodb.net/?retryWrites=true&w=majority`;

  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(uri, mongooseOptions)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
      return console.error("Error connecting to MongoDB Atlas:", error);
    });
};
