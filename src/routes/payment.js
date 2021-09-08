const router = require("express").Router();
const payment = require("../controllers/payment");

router.get("/", payment.getAll);
router.post("/", payment.create);
router.get("/:id", payment.get);
router.put("/:id", payment.update);
router.delete("/:id", payment.delete);

module.exports = router;
