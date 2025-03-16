import express from "express";
import {registerUser, loginUser, currentUser, updateUser, deleteUser} from "../controllers/userController.js"
import validateToken from "../middleware/validateToken.js";





const router = express.Router();




router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);


router.put('/update', validateToken, updateUser);       

router.delete('/delete', validateToken, deleteUser);    




export default router;