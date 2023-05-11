import express  from "express";
import authController from "../controllers/authController.js";
const router = express.Router();


router.post('/register',authController.register_A_User);
router.post('/login',authController.loginUser);
router.put('/changePassword',authController.changePassword)

export default router;