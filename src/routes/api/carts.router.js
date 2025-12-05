import { Router } from "express";
import CartManager from "../../managers/CartManager.js";

const router= Router();
const cm = new CartManager();

router.post("/", async (req, res) =>{
    const cart = await cm.createCart();
    res.status(201).json(cart);
});

router.get("/:cid", async (req, res) =>{
    const cart = await cm.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({error: "Carrito no encontrado"});
    res.json(cart.products);
});

router.post("/:cid/product/:pid" ,async (req, res) =>{
    const updatedCart = await cm.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({error: "Carrito no encontrado"});

}); 
export default router;