const router = require("express").Router();
const ads = require("../controllers/ads");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", ads.getAll);
router.get("/:id", ads.get);
router.patch("/:id", [auth, admin], ads.update);
router.delete("/:id", [auth, admin], ads.delete);
router.post("/", [auth, admin], ads.create);

module.exports = router;
