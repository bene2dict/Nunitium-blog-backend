import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the user's name"],
    },
    username: {
      type: String,
      required: [true, "Please add the user username"],
      unique: true
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: true
    },
    description: {
     type:  String,
      required: [true, "Please add the user description"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    user_img:{ type: String},
    public_id: { type: String},
    state: {type: String},
    city: {type: String}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
