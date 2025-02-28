import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function for user registration
export const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } =
      req.body;

    // Check the missing data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !role
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Check the user is already exist or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res.status(200).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login user method
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Incorrect email or password",
      success: false,
    });
  }

  //   Check the user role
  if (role != user.role) {
    return res.status(400).json({
      message: `User does not have an account with ${user.role} role`,
      success: false,
    });
  }

  const tokenData = {
    userId: user._id,
  };

  const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  user = {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: `Welcome back ${user.firstName}`,
      user,
      success: true,
    });
};
