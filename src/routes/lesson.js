const router = require("express").Router();
const lesson = require("../controllers/lesson");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", lesson.getAll);
router.post("/", lesson.create);
router.get("/:id", lesson.get);
router.put("/:id", lesson.update);
router.delete("/:id", lesson.delete);

module.exports = router;
