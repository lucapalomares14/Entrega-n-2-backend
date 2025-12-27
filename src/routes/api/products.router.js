import { Router } from "express";
import Product from "../../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query ? { category: query } : {};

    const options = {
      limit: Number(limit),
      page: Number(page),
      sort: sort
        ? { price: sort === "asc" ? 1 : -1 }
        : {}
    };

    const result = await Product.paginate(filter, options);

    res.status(200).send({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `http://localhost:8080/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `http://localhost:8080/api/products?page=${result.nextPage}`
        : null
    });

  } catch (error) {
    res.status(500).send({
      status: "error",
      error: error.message
    });
  }
});

export default router;