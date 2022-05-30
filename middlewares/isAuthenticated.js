module.exports = (req, res, next) => {
	if (req.user) {
		console.log("si esta logueado");
		return next();
	}
	console.log("no esta logueado");
	res.redirect("/");
};

//me parece que esto no anda!!!
