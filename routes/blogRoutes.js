import express from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blogController.js";
import validateToken from "../middleware/validateToken.js";
import multer from "multer";



const router = express.Router();
const upload = multer()



router.get("/", getBlogs);

router.get("/:id", getBlog);

router.post("/", validateToken, upload.none(), createBlog);

router.put("/:id", validateToken, updateBlog);

router.delete("/:id", validateToken, deleteBlog);



export default router;