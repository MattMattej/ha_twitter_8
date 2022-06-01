const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
	content: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user", //la clave foranea es autor, va a ser de tipo ID, y referencia al modelo user!!!!
	},
	date: { type: Date, default: Date.now },
	favoriteCount: { type: Number, default: 0 }, //ESTO NO SE BORRO POR TIEMPO
	favoritedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	],
});
module.exports = mongoose.model("tweet", TweetSchema);
