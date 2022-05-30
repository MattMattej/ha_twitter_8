const bcrypt = require("bcryptjs");
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
//middleware que se ejecuta antes de guardar y hashea las passwords
//no funciona con arrow function!!
UserSchema.pre("save", { document: true, query: true }, async function (next) {
	this.password = await bcrypt.hash(this.password, 10);

	next();
});
module.exports = mongoose.model("user", UserSchema);
