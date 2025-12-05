import { Router } from "express";
import Cart from "../../models/cart.model.js";

const router = Router();


router.delete("/:cid/products/:pid", async(req, res) => {
  const { cid, pid } = req.params;

  const cart = await Cart.findById(cid);

  cart.products = cart.products.filter(p => p.product.toString() !== pid);

  await cart.save();

  res.send({ status: "success", cart });
});


router.put("/:cid", async(req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });

  res.send({ status: "success", cart });
});


router.put("/:cid/products/:pid", async(req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findById(cid);

  const product = cart.products.find(p => p.product.toString() === pid);
  product.quantity = quantity;

  await cart.save();

  res.send({ status: "success", cart });
});


router.delete("/:cid", async(req, res) => {
  const { cid } = req.params;

  const cart = await Cart.findById(cid);
  cart.products = [];

  await cart.save();

  res.send({ status: "success", cart });
});


router.get("/:cid", async(req, res) => {
  const { cid } = req.params;

  const cart = await Cart.findById(cid).populate("products.product");

  res.send({ status: "success", cart });
});

export default router;