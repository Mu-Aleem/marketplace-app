import { Product } from "../../models/products.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

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
    seller,
  } = req.body;

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
    seller,
  });

  const data = await newProduct.save();
  return res
    .status(201)
    .json(new ApiResponse(200, data, "Product created successfully"));
});

export { createProduct };
