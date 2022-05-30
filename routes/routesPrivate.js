const express = require("express");
const router = express.Router();
const controller = require("../controllers/privateController");
const isAuthenticated = require("../middlewares/isAuthenticated");


//pagina de perfil
router.get("/profile", (req, res) => {
	res.render("profile", { user: req.user });
});

//crear un tweet
router.get("/crear", controller.renderNewTweet);
router.post("/crear", controller.newTweet);

//borrar un tweet
router.get("/delete/:id", controller.deleteTweet);

//logout
router.get("/logout", controller.logout);

module.exports = router;
