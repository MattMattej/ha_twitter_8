const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  description: { type: String, default: "Hi evryone!" },
  avatar: {
    type: String,
    default: "\\img\\defaultavatar.jpg",
  },
  tweets: [
    {
      type: mongoose.Types.ObjectId,
      ref: "tweet",
    },
  ],
  followedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  followedCount: { type: Number, default: 0 },
  follows: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  followsCount: { type: Number, default: 0 },
});
module.exports = mongoose.model("user", UserSchema);
