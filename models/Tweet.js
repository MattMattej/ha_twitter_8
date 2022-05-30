const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", //se le pasa el nombre del modelo.
  },
  date: { type: Date, default: Date.now },
  favoriteCount: { type: Number, default: 0 },
  favoritedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});
module.exports = mongoose.model("tweet", TweetSchema);
