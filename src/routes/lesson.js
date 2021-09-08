const router = require("express").Router();
const lesson = require("../controllers/lesson");

router.get("/", lesson.getAll);
router.post("/", lesson.create);
router.get("/:id", lesson.get);
router.put("/:id", lesson.update);
router.delete("/:id", lesson.delete);

module.exports = router;
