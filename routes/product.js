const router = require("express").Router();
const product = require("../controllers/products");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", product.getAll);
router.get("/:id", product.get);
router.patch("/:id", [auth, admin], product.update);
router.delete("/:id", [auth, admin], product.delete);
router.post("/", [auth, admin], product.create);

module.exports = router;
