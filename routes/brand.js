const router = require("express").Router();
const brand = require("../controllers/brands");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", brand.getAll);
router.get("/:id", brand.get);
router.patch("/:id",  brand.update);
router.delete("/:id",  brand.delete);
router.post("/",  brand.create);

module.exports = router;
