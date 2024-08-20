import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      url: Array,
    },
    billAvaliable: {
      type: Boolean,
      default: false,
      required: true,
    },
    warrantyAvaliable: {
      type: Boolean,
      default: false,
      required: true,
    },
    accoessoriesAvaliable: {
      type: Boolean,
      default: false,
      required: true,
    },
    boxAvaliable: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    // stock: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    //   default: 0,
    // },
    // sold: {
    //   type: Number,
    //   default: 0,
    // },
    // ratings: [
    //   {
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     rating: { type: Number, min: 1, max: 5 },
    //     comment: String,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Products", productSchema);
