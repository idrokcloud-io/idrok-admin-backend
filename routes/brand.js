const router = require("express").Router();
const brand = require("../controllers/brands");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", brand.getAll);
router.get("/:id", brand.get);
router.patch("/:id", [auth, admin], brand.update);
router.delete("/:id", [auth, admin], brand.delete);
router.post("/", [auth, admin], brand.create);

module.exports = router;
