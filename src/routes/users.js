const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../utils/auth");
const admin = require("../utils/admin");


router.get("/", user.getAll);
router.get("/:id", user.get);

router.post("/login", user.login);
router.post("/register", user.register);

router.put("/:id", user.update);
router.delete("/:id", user.delete);

module.exports = router;
