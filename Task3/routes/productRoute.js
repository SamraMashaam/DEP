import express from "express";
import {
    getProductController,
    getSingleProductController,
    productPhotoController,
    createProductController,
    productListController
  } from "../controller/productController.js";
  import formidable from "express-formidable";

const router = express.Router();

router.post("/create-product",  formidable(), createProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

router.get("/product-list", productListController);

export default router;