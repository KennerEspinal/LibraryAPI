import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";
import { RolModel } from "../Models/RolModel.js";
import { SECRET } from "../Config/config.js";

export const signupHandler = async (req, res) => {
  try {
    const { fullName, email, password, rol } = req.body;

    // Creating a new User Object
    const newUser = new UserModel({
      fullName,
      email,
      password,
    });

    // checking for roles
    if (rol) {
      const foundRoles = await RolModel.find({ name: { $in: rol } });
      newUser.rol = foundRoles.map((rol) => rol._id);
    } else {
      const rol = await RolModel.findOne({ name: "User" });
      newUser.rol = [rol._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await UserModel.findOne({ email: req.body.email }).populate(
      "rol"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await UserModel.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
