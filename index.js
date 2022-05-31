require("dotenv").config();
// const userSeeder = require("./seeders/seederUsuarios")();
// //el seeder solo asocia un usuario a todos los tweet =(
// const tweetSeeder = require("./seeders/seederTweets")();
const dbInit = require("./models");
const express = require("express");
const app = express();
const routerpublic = require("./routes/routesPublic");
const routerPrivate = require("./routes/routesPrivate");
const session = require("express-session");
const passport = require("./config/passport");
const port = process.env.PORT;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
passport(app);
app.use(express.static("public"));
app.use(express.json());
app.use("/", routerpublic);
app.use("/", routerPrivate);

app.listen(port, () => {
	console.log("server up");
});

dbInit();
