import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please complete this field"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = mongoose.model("Category", categorySchema);
