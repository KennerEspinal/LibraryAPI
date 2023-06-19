import express from "express";
import { createUser, deleteUser, getUsers, getUser, updateUser } from "../../Controllers/UserController.js";
import { verifyToken, isModerator, isAdmin } from "../../Middlewares/AuthMiddleware.js";


const router = express.Router();

router
    /**
    * @swagger
    * /api/v1/users:
    *   get:
    *     summary: Get list of Users
    *     tags: [User]
    *     description: Get all users.
    *     responses:
    *       200:
    *         description: Get list users successfully.
    *       500:
    *         description: Internal Error.
    */
    .get('/', [verifyToken, isModerator, isAdmin], getUsers)

    /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     summary: Create new User
   *     tags: [User]
   *     description: create a new User with he information sended.
   *     parameters:
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *                 example: ELvis Presley
   *               email:
   *                type: string
   *                example: elvispresley@gmail.com
   *               password:
   *                type: string
   *                example: P4ssw0rd-123.
   *               rol:
   *                type: array
   *                example: ["User"]
   *     responses:
   *       201:
   *         description: the user has created successfully.
   *       400:
   *         description: Request Failed.
   *       500:
   *         description: Internal Error.
   */
    .post('/', [verifyToken, isModerator, isAdmin], createUser)

    /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get a User by ID
   *     tags: [User]
   *     description: Get the details of user by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID user
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully obtained user details.
   *       404:
   *         description: Winner not found.
   *       500:
   *         description: Internal Error.
   */
    .get('/:id', [verifyToken, isModerator, isAdmin], getUser)

    /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Update a User by ID
   *     tags: [User]
   *     description: Update a User's details based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: User ID
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *                 example: ELvis Presley
   *               email:
   *                type: string
   *                example: elvispresley@gmail.com
   *               password:
   *                type: string
   *                example: P4ssw0rd-123.
   *               rol:
   *                type: array
   *                example: ["User"]
   *     responses:
   *       200:
   *         description: User Updated Successfully.
   *       400:
   *         description: Request Failed.
   *       404:
   *         description: User not found.
   *       500:
   *         description: Internal Error.
   */
    .put('/:id', [verifyToken, isModerator, isAdmin], updateUser)

    /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Remove a User by ID.
   *     tags: [User]
   *     description: Remove a User based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: User ID
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User successfully removed.
   *       404:
   *         description: User not found.
   *       500:
   *         description: Internal Error.
   */
    .delete('/:id', [verifyToken, isAdmin], deleteUser)


export default router
