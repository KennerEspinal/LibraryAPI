import { UserModel } from "../Models/UserModel.js";
import { RolModel } from "../Models/RolModel.js";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json(`user with ID: ${id} not found`);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error has ocurred." });
  }
};

export const createUser = async (req, res) => {
  try {
    const { fullName, email, password, rol } = req.body;

    const rolesFound = await RolModel.find({ name: { $in: rol } });

    // creating a new User
    const user = new UserModel({
      fullName,
      email,
      password,
      rol: rolesFound.map((rol) => rol._id),
    });

    // encrypting password
    user.password = await UserModel.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      rol: savedUser.rol,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error has ocurred." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json(`user with ID: ${id} not found`);
    }
    res.status(200).json("user successfully removed.");
  } catch (error) {
    res.status(500).json({ message: "An error has ocurred." });
  }
};

