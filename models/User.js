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
	tweets: [{ type: mongoose.Types.ObjectId, ref: "tweet" }],
});
module.exports = mongoose.model("user", UserSchema);
