import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  editProduct,
} from "../../controllers/products/products.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();
router.route("/").post(verifyJWT, createProduct);
router.route("/").get(verifyJWT, getAllProducts);
router.route("/:id").get(verifyJWT, getProductById);
router.route("/:id").patch(verifyJWT, editProduct);
router.route("/:id").delete(verifyJWT, deleteProduct);

export default router;
