import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const pm = new ProductManager();

router.get("/", async (req ,res) =>{
    const products = await pm.getAll();
    res.render("home", {products});
});

router.get("/realtimeproducts", async (req, res) =>{
    const products = await pm.getAll();
    res.render("realTimeProducts", {products});
});

export default router;

router.get("/products", async(req, res) => {
  const { limit, page, sort, query } = req.query;

  const result = await Product.paginate({}, { limit: 10, page: 1 });

  res.render("products", {
    products: result.docs,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
    nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null
  });
});