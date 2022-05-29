const Tweet = require("../models/Tweet");
const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = {
	renderNewTweet: async (req, res) => {
		res.render("newTweet");
	},
	newTweet: async (req, res) => {
		if (req.user) {
			const unTweet = await new Tweet({
				content: req.body.content,
				author: mongoose.Types.ObjectId(req.user._id),
				email: req.user.email,
				likes: 0,
			});
			await unTweet.save();
			res.json(unTweet);
		} else {
			res.redirect("/login");
		}
	},
	deleteTweet: async (req, res) => {
		await Tweet.findOneAndDelete({ _id: req.params.id });
		res.redirect("/");
	},
	logout: (req, res) => {
		req.logout((err) => {
			if (err) return next(err);
		});
		res.redirect("/");
	},
};
