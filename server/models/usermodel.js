import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);
