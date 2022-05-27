const session = require("express-session");
module.exports = session({
  secret: process.env.APP_PASSWORD,
  resave: false, // Docs: "The default value is true, but using the default has been deprecated". saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
});
