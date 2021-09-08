const router = require("express").Router();
const group = require("../controllers/group");

router.get("/", group.getAll);
router.post("/", group.create);
router.get("/:id", group.get);
router.put("/:id", group.update);
router.delete("/:id", group.delete);

module.exports = router;
