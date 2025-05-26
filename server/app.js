import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRouter.js";
import craouselRoutes from "./routes/craouselRoutes.js";

const app = express();
dotenv.config({path:'./config.env'});

// Use morgan for logging
app.use(morgan("dev"));

// Enable CORS for frontend origin
const allowedOrigins = ["https://kloth-frontend.onrender.com"];

const corsOptions = {
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests like curl or postman
    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Connect to database
connectDB();

// Middleware to skip express.json for /api/v1/craousel routes to allow formidable to parse multipart/form-data
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/v1/craousel")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/craousel", craouselRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 4000

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on  mode on port ${PORT}`.bgCyan.white
  );
});
