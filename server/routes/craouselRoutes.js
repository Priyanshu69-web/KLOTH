import express from "express";
import {
  createCarouselItemController,
  updateCarouselItemController,
  deleteCarouselItemController,
  getCarouselItemsController,
  getCarouselImageController,
} from "../controller/productController.js";

const router = express.Router();

// Create a new carousel item
router.post("/", createCarouselItemController);

// Get all carousel items
router.get("/", getCarouselItemsController);

// Get carousel image by id
router.get("/image/:id", getCarouselImageController);

// Update a carousel item by id
router.put("/:id", updateCarouselItemController);

// Delete a carousel item by id
router.delete("/:id", deleteCarouselItemController);

export default router;
