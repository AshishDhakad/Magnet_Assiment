const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/task.controller");
const admin = require("../middleware/admin");

router.post("/", auth, ctrl.createTask);
router.get("/", auth, ctrl.getTasks);
router.patch("/:id/status", auth, ctrl.updateStatus);
router.put("/:id", auth, ctrl.updateTask);
router.delete("/:id", auth, ctrl.deleteTask);
router.patch("/:id/assign", auth, admin, ctrl.assignTask);
router.patch("/:id/status", auth, ctrl.updateStatus);

router.get("/:id", auth, ctrl.getTaskById);

module.exports = router;
