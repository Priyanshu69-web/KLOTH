import usermodel from "../models/usermodel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "./../helper/authHelper.js";
import { OAuth2Client } from "google-auth-library";
import JWT from "jsonwebtoken";

const googleClient = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

export const registerController = async (req, res) => {
  const { username, email, password, phone, address, answer } = req.body;

  if (!username || !email || !phone || !address || !password || !answer) {
    return res.status(422).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const userExist = await usermodel.findOne({ email });
    if (userExist) {
      return res.status(422).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new usermodel({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({ success: true, message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    //check user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found with this email",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    // // //token
    const token = JWT.sign({ _id: user._id },

      process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(token);
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};



//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Google Login Controller
export const googleLoginController = async (req, res) => {
  try {
    const { token } = req.body;


    // Verify Google token
    const ticket = await googleClient.verifyIdToken({

      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await usermodel.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await usermodel.create({
        username: name,
        email,
        profilePhoto: picture,
        password: '',
        role: 0,
      });
    }


    // Generate JWT token
    const jwtToken = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Google login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Google login",
      error,
    });
  }
};



//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await usermodel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await usermodel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "username");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

//get all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await usermodel.find({});
    res.status(200).send({
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all Users",
    })
  }
};
