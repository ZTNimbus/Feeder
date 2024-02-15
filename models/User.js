import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  //   fullName: String - You can add new properties freely later on
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema); //Giving .model() 2 arguments means you are trying to load a schema to that model(mongoose)/collection(mongodb)

//Mongoose's model === MongoDB's collection
