import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getInventoryStats
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/search/:name", searchProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/stats", getInventoryStats);


export default router;
