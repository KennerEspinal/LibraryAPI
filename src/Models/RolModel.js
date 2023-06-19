import mongoose from "mongoose";

export const ROLES = ["User", "Admin", "Moderator"];

const rolSchema = new mongoose.Schema(
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

export const RolModel = mongoose.model("Rol", rolSchema);
