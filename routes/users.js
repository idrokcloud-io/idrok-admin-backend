const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/",  user.getAll);
router.get("/:id",  user.get);
router.patch("/", auth, user.update);
router.delete("/", auth, user.delete);

router.post("/login", user.login);
router.post("/register", user.register);

router.post("/changeCart", auth, user.changeCart);
router.post("/changeLiked", auth, user.changeLiked);
router.post("/changeComparison", auth, user.changeComparison);

module.exports = router;
