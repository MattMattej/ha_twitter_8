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
//busca un usuario y lo compara con la password que le llega
UserSchema.methods.compare = async function (model, password) {
	const user = await model.findOne({ username: req.body.username });
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};
module.exports = mongoose.model("user", UserSchema);
