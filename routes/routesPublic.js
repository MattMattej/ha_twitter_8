const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicController");

//home con la lista de tweets
router.get("/", controller.getAll);

//tweet individual
router.get("/tweet/:id", controller.getOne);

//login y redireccion en caso de error
router.get("/login", controller.renderLogin);

router.post("/login", controller.authenticateLogin);

//registro de usuario
router.get("/registro", controller.renderRegister);

router.post("/registro", controller.userRegister);

module.exports = router;
