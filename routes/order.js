const router = require("express").Router();
const order = require("../controllers/order");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", order.getAll);
router.get("/:id", order.get);
router.patch("/:id", order.update);
router.delete("/:id", order.delete);
router.post("/", order.create);

module.exports = router;
