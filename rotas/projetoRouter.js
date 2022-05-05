const express = require("express");
const router = express.Router();
const autMiddleware = require("../middleware/autentificacao")

router.use(autMiddleware)

router.get("/", (req, res) => {
    res.send({ok: true, usuarios: req.usuariosId});
});

module.exports = app => app.use("/projetos", router)