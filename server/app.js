import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRouter.js";
import craouselRoutes from "./routes/craouselRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config({ path: path.join(__dirname, ".env") });

// Use morgan for logging
app.use(morgan("dev"));

// Enable CORS for frontend origin
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like curl or postman
    if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
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
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/craousel", craouselRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const parsedPort = Number.parseInt(process.env.PORT, 10);
const PORT = Number.isNaN(parsedPort) ? 4000 : parsedPort;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on  mode on port ${PORT}`.bgCyan.white
  );
});
