import express from "express";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js"
import dotenv from "dotenv";
import cors from "cors";





const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config()
connectDB();


// Configure CORS
app.use(cors({
  origin: ["*"],
  // ["http://localhost:5173", "https://nunitium-blog.vercel.app", "nunitium-blog.vercel.app"], // Allow requests from frontend
  credentials: true, // Enable credentials (if using cookies or auth headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler)



app.listen(PORT, () => {
    console.log("app is listening at port " + PORT);
})