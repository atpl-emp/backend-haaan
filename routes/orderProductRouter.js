const { Router } = require("express");

// const { ProductModel } = require("../models/Product.model");
const { OrderedProductModel } = require("../models/Ordered_Product.model");
const { authentication } = require("../middleWares/authentication");

const OrderedProductRouter = Router();

// Post your orderd products here
OrderedProductRouter.post(
  "/ordered_product",
  authentication,
  async (req, res) => {
    const { brand, MRP, finalPrice, img, orderedDate } = req.body;
    console.log(req.body);

    const new_product = new OrderedProductModel({
      brand,
      MRP,
      finalPrice,
      img,
      orderedDate,
    });
    console.log(new_product);
    await new_product.save();
    res.status(200).send("Product ordered successfully.");
  }
);

OrderedProductRouter.get(
  "/get-ordered-list",
  authentication,
  async (req, res) => {
    try {
      const products = await OrderedProductModel.find();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a specific product
OrderedProductRouter.delete("/delete/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await OrderedProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { OrderedProductRouter };
