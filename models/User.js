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
//middleware que se ejecuta antes de guardar
UserSchema.pre("save", async (next) => {
	//checkea si la password esta presente y es modificada
	if (this.password && this.isModified("password")) {
		//lo hashea
		return (this.password = await bcrypt.hash(this.password, 10));
	}
});
module.exports = mongoose.model("user", UserSchema);
