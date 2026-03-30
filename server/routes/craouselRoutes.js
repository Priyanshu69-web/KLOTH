import express from "express";
import {
  createCarouselItemController,
  updateCarouselItemController,
  deleteCarouselItemController,
  getCarouselItemsController,
  getCarouselImageController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new carousel item
router.post("/", requireSignIn, isAdmin, createCarouselItemController);

// Get all carousel items
router.get("/", getCarouselItemsController);

// Get carousel image by id
router.get("/image/:id", getCarouselImageController);

// Update a carousel item by id
router.put("/:id", requireSignIn, isAdmin, updateCarouselItemController);

// Delete a carousel item by id
router.delete("/:id", requireSignIn, isAdmin, deleteCarouselItemController);

export default router;
