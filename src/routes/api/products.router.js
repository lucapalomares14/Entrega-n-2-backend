import { Router } from "express";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();
const pm = new ProductManager();


router.get("/", async (req, res) => {
    const products = await pm.getProducts();
    res.send(products);
});

router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await pm.getProductById(id);

    if (!product) {
        return res.status(404).send({ error: "Producto no encontrado" });
    }

    res.send(product);
});

router.post("/", async (req, res) => {
    const newProduct = req.body;
    const result = await pm.addProduct(newProduct);
    res.send(result);
});

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const result = await pm.deleteProduct(id);
    res.send(result);
});

export default router;