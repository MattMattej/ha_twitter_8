const express = require("express");
const router = express.Router();
const controller = require("../controllers/privateController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const Tweet = require("../models/Tweet"); //se va ahora

// router.use(isAuthenticated);

//pagina de perfil
router.get("/profile", (req, res) => {
	res.render("profile", { user: req.user });
});

//boton de like
// router.post("/favTweet/:id", async function (req, res) {
// 	const untweet = await Tweet.findOne({ _id: req.params.id });
// 	untweet.favoritedBy = req.user._id;
// 	res.json(untweet);
// });
router.post("/favTweet/:id", controller.favTweet);

//crear un tweet
router.get("/crear", controller.renderNewTweet);
router.post("/crear", controller.newTweet);

//borrar un tweet
router.get("/delete/:id", controller.deleteTweet);

//logout
router.get("/logout", controller.logout);

module.exports = router;
