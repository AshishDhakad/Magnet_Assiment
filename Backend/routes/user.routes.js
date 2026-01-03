
const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const ctrl = require("../controllers/user.controller");

router.get("/", auth, admin, ctrl.getAllUsers);
router.post("/", auth, admin, ctrl.createUser);
router.delete("/:id", auth, admin, ctrl.deleteUser);

module.exports = router;

