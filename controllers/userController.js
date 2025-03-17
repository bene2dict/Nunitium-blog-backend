import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, description, password } = req.body;

  if (!name || !username || !email || !description || !password) {
    res.status(400);  
    throw new Error("All fields are mandatory");
    
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await User.create({
    name,
    username,
    email,
    description,
    password: hashedPassword,
    public_id: "",
    user_img: "",
    city: "",
    state: ""
  });


  if (user) {
    res
      .status(201)
      .json({
        _id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        description: user.description,
        public_id: "",
        user_img: "",
        city: "",
        state: ""
      });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
});

const loginUser = asyncHandler( async (req, res) => {
  const {email, password} = req.body;


  const user = await User.findOne({ email });

  if(!user) {
    res.status(404);
    throw new Error("User not found");
  }


  const validPassword = await bcrypt.compare(password, user.password);

  if(!validPassword) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  const accessToken = jwt.sign({
    user: {
        id: user.id,
        username: user.username,
        email: user.email
    },

  },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "1h" }
)

  res.status(200).json({token: accessToken, userData: user});
});

const currentUser = (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user);
};

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const {imageUrl, publicId, state, city} = req.body;


  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check for email conflict
  if (req.body.email && req.body.email !== user.email) {
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      res.status(400);
      throw new Error("Email already registered");
    }
    user.email = req.body.email;
  }

  // Check for username conflict
  if (req.body.username && req.body.username !== user.username) {
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      res.status(400);
      throw new Error("Username already taken");
    }
    user.username = req.body.username;
  }


  // Update other fields
  if (req.body.name) user.name = req.body.name;
  if (req.body.description) user.description = req.body.description;
  if(imageUrl) user.user_img = imageUrl;
  if(publicId) user.public_id = publicId;
  if(state) user.state = state;
  if(city) user.city = city;

  // Handle password update
  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: user._id });
  
  res.status(200).json({
    message: "User account deleted successfully",
    deletedId: user._id
  });
});

export { registerUser, loginUser, currentUser, updateUser, deleteUser };
