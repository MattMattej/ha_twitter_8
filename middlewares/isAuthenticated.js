module.exports = (req, res, next) => {
	"/profile",
		(req, res) => {
			if (req.user) {
				res.redirect("/profile");
				return next();
			}
			res.redirect("/");
			return next();
		};
};

//me parece que esto no anda!!!
