const Tweet = require("../models/Tweet");
const User = require("../models/User");
const mongoose = require("mongoose");
//prueba
module.exports = {
	getAll: async (req, res) => {
		if (!req.user) {
			return console.log("");
		}
		const tweets = await Tweet.find({
			$or: [{ favoritedBy: req.user._id }, { author: req.user._id }],
		}).populate("author");

		const users = await User.find();
		res.render("home", { tweets, user: req.user, users });
	},
	renderNewTweet: async (req, res) => {
		res.render("newTweet");
	},
	newTweet: async (req, res) => {
		if (req.user) {
			const unTweet = await new Tweet({
				content: req.body.content,
				author: req.user._id,
				email: req.user.email,
				likes: 0,
			});
			await unTweet.save();
			res.redirect("/");
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
	favTweet: async (req, res) => {
		console.log("entre a la rutaaaa");
		//Me traigo el tuit que quiero chequear si el usuario likeo o no.
		console.log(req.params.id);

		//arranca aca
		const tweetCheck = await Tweet.findById(req.params.id);

		//Me sirve para saber si el usuario está o no en la lista de likers. 0 no likea, otro si.
		let hasUser = tweetCheck.favoritedBy.includes(req.user.id);
		console.log(hasUser);

		// Si doy like, entonces lo voy a sacar del listado de array (pide dislike).
		if (hasUser) {
			await Tweet.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						favoritedBy: req.user._id,
					},
					$inc: {
						favoriteCount: -1,
					},
				},
				{ new: true }
			);
		} else {
			await Tweet.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						favoritedBy: req.user._id,
					},
					$inc: {
						favoriteCount: 1,
					},
				},
				{ new: true }
			);
		}
		res.redirect("/");
	},
	favUser: async (req, res) => {
		//Importante para lo que sigue: usuario A viene de req.user._id, usuario B viene de req.params.id

		//Me traigo el user que quiero chequear si el usuario A followeó o no a B. Comparo con usuario A y B (ambos tienen followedBy y follows)
		const userCheck = await User.findById(req.params.id);

		//Me sirve para saber si el usuario está o no en la lista de follows. 0 si A no sigue a B, otro número si A sigue a B
		const hasUser = userCheck.followedBy.includes(req.user._id);

		//Si A le hizo follow a B y aprieto, entonces lo voy a sacar del listado de array de seguidores de B (pide unfollow).
		if (hasUser) {
			//Acá sacamos de la lista de followdBy de B al usuario A
			await User.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						followedBy: req.user._id,
					},
					$inc: {
						followedCount: -1,
					},
				},
				{ new: true }
			);
			//Acá sacamos de la lista de follows de A al usuario B
			await User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: {
						follows: req.params.id,
					},
					$inc: {
						followedCount: -1,
					},
				},
				{ new: true }
			);
		} else {
			//Acá sumamos en la lista de followdBy de B al usuario A
			await Tweet.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						followedBy: req.user._id,
					},
					$inc: {
						followedCount: 1,
					},
				},
				{ new: true }
			);
			//Acá agregamos en la lista de follows de A al usuario B
			await Tweet.findByIdAndUpdate(
				req.user._id,
				{
					$push: {
						follows: req.params.id,
					},
					$inc: {
						followedCount: 1,
					},
				},
				{ new: true }
			);
		}
	},
	checkProfile: async (req, res) => {
		const profile = await User.findById(req.params.id).populate(
			"tweets",
			"follows"
			// "followedBy"
		);
		const userTweets = await Tweet.find({ _id: req.params.id }).populate(
			"author"
		);
		res.render("profile", { user: req.user, profile, userTweets });
	},

	// CUANDO SE DA FOLLOW REVISA SI EL USUSARIO YA ESTA EN EL ARRAY DE SEGUIDOS O NO
	followUser: async (req, res) => {
		const otherUser = await User.findById(req.params.id);
		// SI EL USUARIO YA ESTA EN LA LISTA LO SACO
		if (req.user.follows.includes(otherUser._id)) {
			await User.findByIdAndUpdate(req.user._id, {
				$pull: { follows: req.params.id },
			});
			console.log("hace unfollow");
			// SACA AL QUE DA AL BOTON FOLLOW DE LA LISTA DEL OTRO USUARIO
			await User.findByIdAndUpdate(req.params.id, {
				$pull: { followedBy: req.user._id },
			});
			res.redirect(`/profile/${req.params.id}`);
		} else {
			// SI NO ESTA EN LA LISTA LO AGREGO
			await User.findOneAndUpdate(req.params.id, {
				$push: { follows: req.params.id },
			});
			console.log("hace follow");
			// AGREAGA AL QUE DA CLICK AL BOTON, A LA LISTA DEL OTRO USUARIO
			await User.findByIdAndUpdate(req.params.id, {
				$push: { followedBy: req.user._id },
			});
			res.redirect(`/profile/${req.params.id}`);
		}

		// console.log("estas en los seguidores de este usuario");
		// await User.findByIdAndUpdate(req.user._id, {
		// 	$push: { follows: [req.params.id] },
		// });
		// console.log("Estas siguiendo a este usuario");
	},
};
