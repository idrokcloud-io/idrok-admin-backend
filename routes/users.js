const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../utils/auth");
const admin = require("../utils/admin");


router.post("/login", user.login);
router.post("/register", user.register);

router.get("/changeCart", user.changeCart);
router.patch("/changeLiked", user.changeLiked);
router.post("/changeComparison", user.changeComparison);

router.get("/", user.getAll);
router.get("/:id", user.get);
router.patch("/:id", user.update);
router.delete("/:id", user.delete);

module.exports = router;
