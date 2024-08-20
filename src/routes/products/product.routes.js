import { Router } from "express";
import { createProduct } from "../../controllers/products/products.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();
router.route("/").post(verifyJWT, createProduct);

export default router;
