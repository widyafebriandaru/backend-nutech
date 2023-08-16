const express = require("express");
const {
    getUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/UserController");
const router = express.Router();
const { verifyUser, adminOnly } = require("../middleware/AuthUser");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.delete("/users/:id",verifyUser, adminOnly, deleteUser);

module.exports = router;
