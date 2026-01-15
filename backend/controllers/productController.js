import Product from "../models/Product.js";

// Add new product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search products by name
export const searchProducts = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getInventoryStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;
    const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
    const lowStock = products.filter(p => p.quantity <= 5).length;
    const outOfStock = products.filter(p => p.quantity === 0).length;

    res.json({ totalProducts, totalItems, lowStock, outOfStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
