import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    author_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add the blog title"],
    },
    description: {
      type: String,
      required: [true, "Please add the blog description"],
    },
    categories: {
      type: [String],
    },
    postImg: { 
      type: String 
    },
    publicId: {
      type: String
    },
    editorsPick: {
      type: Boolean,
      default: false, 
    },
    featuredPost: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
