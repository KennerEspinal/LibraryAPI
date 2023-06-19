import { UserModel } from "../Models/UserModel.js";
import { ROLES }  from "../Models/RolModel.js";

export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await UserModel.findOne({ fullName: req.body.fullName });
    if (userFound)
      return res.status(400).json({ message: "The user already exists" });

    const email = await UserModel.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkExistingRole = (req, res, next) => {
  if (!req.body.rol) return res.status(400).json({ message: "No roles" });

  for (let i = 0; i < req.body.rol.length; i++) {
    if (!ROLES.includes(req.body.rol[i])) {
      return res.status(400).json({
        message: `Role ${req.body.rol[i]} does not exist`,
      });
    }
  }

  next();
};
