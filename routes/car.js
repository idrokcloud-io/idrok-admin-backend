const router = require("express").Router();
const car = require("../controllers/cars");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", car.getAll);
router.get("/:id", car.get);
router.patch("/:id",  car.update);
router.delete("/:id",  car.delete);
router.post("/",  car.create);

module.exports = router;
