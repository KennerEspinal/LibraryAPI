import {RolModel} from "../Models/RolModel.js";
import {UserModel} from "../Models/UserModel.js";
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../Config/config.js";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await RolModel.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new RolModel({ name: "User" }).save(),
      new RolModel({ name: "Moderator" }).save(),
      new RolModel({ name: "Admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await UserModel.findOne({ email: ADMIN_EMAIL });
  console.log(userFound);
  if (userFound) return;

  // get roles _id
  const rol = await RolModel.find({ name: { $in: ["Admin", "Moderator"] } });

  // create a new admin user
  const newUser = await UserModel.create({
    fullName: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    rol: rol.map((rol) => rol._id),
  });

  console.log(`new user created: ${newUser.email}`);
};

createRoles();
createAdmin();
