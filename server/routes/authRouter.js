
import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  getAllUsersController,
  orderStatusController,
  googleLoginController,
} from "../controller/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

router.post("/register", registerController);



//LOGIN || POST
router.post("/login", loginController);

//GOOGLE LOGIN || POST
router.post("/google-login", googleLoginController);


router.get("/test", requireSignIn, isAdmin, testController);


//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});



//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});




//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//Get All Users
router.get("/all-users", requireSignIn, getAllUsersController, isAdmin);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
