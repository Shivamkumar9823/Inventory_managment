import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "General" },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", ProductSchema);
