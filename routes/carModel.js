const router = require("express").Router();
const carModel = require("../controllers/carModel");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", carModel.getAll);
router.get("/:id", carModel.get);
router.patch("/:id",  carModel.update);
router.delete("/:id",  carModel.update);
router.post("/",  carModel.create);

module.exports = router;
