const router = require("express").Router();
const ads = require("../controllers/ads");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", ads.getAll);
router.get("/:id", ads.get);
router.patch("/:id", ads.update);
router.delete("/:id", ads.delete);
router.post("/", ads.create);

module.exports = router;
