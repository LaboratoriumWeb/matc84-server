const express = require("express");
const { create, getAll, getUserById, update, delete: deleteUser, requestPasswordReset, updatePassword } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();
require("../swagger/user");

router.post("/register", create);
router.get("/", authMiddleware, adminMiddleware, getAll); // Apenas admins podem listar todos os usuários
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, deleteUser);

// Rotas para redefinição de senha
router.post("/password-reset", requestPasswordReset); 
router.post("/reset-password/:token", updatePassword); 

module.exports = router;