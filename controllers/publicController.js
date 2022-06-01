const User = require("../models/User");
const Tweet = require("../models/Tweet");
const passport = require("passport");

module.exports = {
	// getOne: async (req, res) => {
	// 	const tweet = await Tweet.findOne({ _id: req.params.id }).populate(
	// 		"author"
	// 	);
	// 	res.render("tweet", { tweet });
	// },
	renderLogin: (req, res) => {
		res.render("login");
	},
	renderRegister: (req, res) => {
		res.render("registro");
	},
	userRegister: async (req, res) => {
		await User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		res.redirect("/");
	},
	authenticateLogin: passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	}),
};
