const router = require("express").Router();
const group = require("../controllers/group");
const auth = require("../utils/auth");
const admin = require("../utils/admin");

router.get("/", group.getAll);
router.post("/", group.create);
router.get("/:id", group.get);
router.put("/:id", group.update);
// router.put("/:id/dates", group.updateDates);
router.put("/:groupId/:studentId", group.addStudent);
router.delete("/:groupId/:studentId", group.removeStudent);
router.delete("/:id", group.delete);

module.exports = router;
