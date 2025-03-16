import asyncHandler from "express-async-handler";
import Blog from "../models/blogModels.js";

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("author_Id", "username name description");
  res.status(200).json(blogs);
});

const getBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("author_Id", "username name description");

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found");
  }

  res.status(200).json(blog);
});

const createBlog = asyncHandler(async (req, res) => {
  // With multer, req.body now contains your fields.
  const { title, description, postImg, publicId } = req.body;
  let { categories } = req.body; 


  // Ensure categories is an array
  if (!Array.isArray(categories)) {
    try {
      categories = JSON.parse(categories);
    } catch (error) {
      categories = [categories];
    }
  }

  if (!title || !description) {
    res.status(400);
    throw new Error("Missing Fields are mandatory");
  }

  const blog = await Blog.create({
    author_Id: req.user.id,
    title,
    description,
    categories,
    postImg,
    publicId
  });

  res.status(200).json(blog);
});


const updateBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const blog = await Blog.findById(id).maxTimeMS(5000);

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found");
  }

  if (blog.author_Id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user Blog");
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, body, { new: true });

  res.status(200).json(updateBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found");
  }

  if (blog.author_Id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user blog");
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);

  res.status(200).json(deletedBlog);
});

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
