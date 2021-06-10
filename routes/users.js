const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", user.getAll);
router.get("/:id", user.get);
router.patch("/", auth, user.update);
router.delete("/:id", auth, user.delete);

router.post("/login", user.login);
router.post("/register", user.register);

router.patch("/changeCart", user.changeCart);
router.patch("/changeLiked", user.changeLiked);
router.post("/changeComparison", user.changeComparison);

module.exports = router;
