const router = require("express").Router();
const car = require("../controllers/cars");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", car.getAll);
router.get("/:id", car.get);
router.patch("/:id", [auth, admin], car.update);
router.delete("/:id", [auth, admin], car.delete);
router.post("/", [auth, admin], car.create);

module.exports = router;
