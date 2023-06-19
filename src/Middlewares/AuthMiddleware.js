import jwt from "jsonwebtoken";
import { SECRET } from "../Config/config.js";
import { UserModel } from "../Models/UserModel.js";
import { RolModel } from "../Models/RolModel.js";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await UserModel.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    const rol = await RolModel.find({ _id: { $in: user.rol } });
    for (let i = 0; i < rol.length; i++) {
      if (rol[i].name === "Moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);
    const rol = await RolModel.find({ _id: { $in: user.rol } });

    for (let i = 0; i < rol.length; i++) {
      if (rol[i].name === "Admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
