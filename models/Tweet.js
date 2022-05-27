const mongoose = require("mongoose");
const Tweet = mongoose.Schema;
const TweetSchema = new Schema({
  content: String(140),
  autor: Users.username,
  email: Email,
  date: { type: Date, default: Date.now },
  likes: Number,
});
