import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please complete this field"],
    },
    description: {
      type: String,
      required: [true, "Please complete this field"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please complete this field"],
    },
    imgURL: {
      type: String,
      required: [true, "Please complete this field"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BookModel = mongoose.model("Book", bookSchema);
