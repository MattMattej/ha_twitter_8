const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicController");

//tweet individual
router.get("/tweet/:id", controller.getOne);

//Usuario individual
//router.get("/user/:id", controller.getOneUser);

//login y redireccion en caso de error
router.get("/login", controller.renderLogin);

router.post("/login", controller.authenticateLogin);

//registro de usuario
router.get("/registro", controller.renderRegister);

router.post("/registro", controller.userRegister);

module.exports = router;
