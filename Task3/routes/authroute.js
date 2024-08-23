import express from "express";
import {registerController, loginController, testController} from "../controller/authcontroller.js";
import { reqsignin, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//REGISTER USER
router.post("/register", registerController);


//LOGIN USER
router.post("/login", loginController);

router.get("/test", reqsignin, isAdmin ,testController);


export default router;