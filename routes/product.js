const router = require("express").Router();
const product = require("../controllers/products");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", product.getAll);
router.get("/:id", product.get);
router.patch("/:id",  product.update);
router.delete("/:id",  product.delete);
router.post("/",  product.create);

module.exports = router;
