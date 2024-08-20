import { Product } from "../../models/products.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("seller", "name email");
  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products retrieved successfully"));
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    age,
    category,
    images,
    billAvaliable,
    warrantyAvaliable,
    accoessoriesAvaliable,
    boxAvaliable,
  } = req.body;

  const UserID = req.user?._id;

  const newProduct = new Product({
    name,
    description,
    price,
    age,
    category,
    images,
    billAvaliable,
    warrantyAvaliable,
    accoessoriesAvaliable,
    boxAvaliable,
    seller: UserID,
  });

  const data = await newProduct.save();
  return res
    .status(201)
    .json(new ApiResponse(200, data, "Product created successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("seller", "name email");
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product retrieved successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const product = await Product.findOneAndDelete({
    _id: id,
    seller: userId,
  });

  if (!product) {
    throw new ApiError(
      404,
      "Product not found or you do not have permission to delete this product"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const {
    name,
    description,
    price,
    age,
    category,
    images,
    billAvaliable,
    warrantyAvaliable,
    accoessoriesAvaliable,
    boxAvaliable,
  } = req.body;

  // Find the product by ID
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Check if the logged-in user is the owner of the product
  if (product.seller.toString() !== userId.toString()) {
    throw new ApiError(403, "You do not have permission to edit this product");
  }

  // Update the product with new data
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.age = age || product.age;
  product.category = category || product.category;
  product.images = images || product.images;
  product.billAvaliable =
    billAvaliable !== undefined ? billAvaliable : product.billAvaliable;
  product.warrantyAvaliable =
    warrantyAvaliable !== undefined
      ? warrantyAvaliable
      : product.warrantyAvaliable;
  product.accoessoriesAvaliable =
    accoessoriesAvaliable !== undefined
      ? accoessoriesAvaliable
      : product.accoessoriesAvaliable;
  product.boxAvaliable =
    boxAvaliable !== undefined ? boxAvaliable : product.boxAvaliable;

  const updatedProduct = await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

export {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  editProduct,
};
