import productModel from "../models/productModel.js";
import categoryModel from "../models/categorymodel.js";
import orderModel from "../models/orderModel.js";
import categorymodel from "../models/categorymodel.js";
import CarouselItem from "../models/craousel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
dotenv.config({path:'./config.env'});

dotenv.config();

const getBraintreeGateway = () => {
  const { BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY, BRAINTREE_PRIVATE_KEY } =
    process.env;

  if (!BRAINTREE_MERCHANT_ID || !BRAINTREE_PUBLIC_KEY || !BRAINTREE_PRIVATE_KEY) {
    return null;
  }

  return new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: BRAINTREE_MERCHANT_ID,
    publicKey: BRAINTREE_PUBLIC_KEY,
    privateKey: BRAINTREE_PRIVATE_KEY,
  });
};

//Craousel 
export const getCarouselItemsController = async (req, res) => {
  try {
    const items = await CarouselItem.find().select("-image.data");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCarouselImageController = async (req, res) => {
  try {
    const item = await CarouselItem.findById(req.params.id).select("image");
    if (item && item.image && item.image.data) {
      res.set("Content-Type", item.image.contentType);
      return res.status(200).send(item.image.data);
    } else {
      return res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

import formidable from "formidable";

const getUploadedFile = (file) => Array.isArray(file) ? file[0] : file;

const readUploadedFile = (file) => fs.readFileSync(file.filepath || file.path);

export const createCarouselItemController = async (req, res) => {
  const form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    try {
      const newItem = new CarouselItem();
      const imageFile = getUploadedFile(files.image);
      if (imageFile) {
        if (imageFile.size > 1000000) {
          return res.status(400).json({ error: "Image should be less than 1MB" });
        }
        newItem.image.data = readUploadedFile(imageFile);
        newItem.image.contentType = imageFile.mimetype || imageFile.type;
      } else {
        return res.status(400).json({ error: "Image is required" });
      }
      await newItem.save();
      res.status(201).json({ success: true, message: "Carousel item created", item: newItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

export const updateCarouselItemController = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    try {
      const { id } = req.params;
      const updatedData = {};
      const imageFile = getUploadedFile(files.image);
      if (imageFile) {
        if (imageFile.size > 1000000) {
          return res.status(400).json({ error: "Image should be less than 1MB" });
        }
        updatedData.image = {};
        updatedData.image.data = readUploadedFile(imageFile);
        updatedData.image.contentType = imageFile.mimetype || imageFile.type;
      }
      const updatedItem = await CarouselItem.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ error: "Carousel item not found" });
      }
      res.json({ success: true, message: "Carousel item updated", item: updatedItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

export const deleteCarouselItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CarouselItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Carousel item not found" });
    }
    res.json({ success: true, message: "Carousel item deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//Create Product
export const createProductController = async (req, res) => {
  try {
    const { name, description,offerings, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res
          .status(400)
          .send({ error: "image is Required and should be less than 1MB" });
    }

    const slug = slugify(name);
    const products = new productModel({ ...req.fields, slug });
    console.log("Creating product with details:", { name, slug, description, price, category, quantity });

    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get image
export const productImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-image");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res
          .status(400)
          .send({ error: "image is Required and should be less than 1MB" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error,
    });
  }
};

// get products by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    const gateway = getBraintreeGateway();
    if (!gateway) {
      return res.status(503).send({
        success: false,
        message: "Payments are not configured on the server",
      });
    }

    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const gateway = getBraintreeGateway();
    if (!gateway) {
      return res.status(503).send({
        success: false,
        message: "Payments are not configured on the server",
      });
    }

    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


// Controller
export const searchProductController = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const products = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while searching products",
    });
  }
};

