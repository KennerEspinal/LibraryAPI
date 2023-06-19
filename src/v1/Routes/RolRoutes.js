import express from "express";
import { createRol, deleteRol, getRols, getRol, updateRol } from "../../Controllers/RolController.js";
import { verifyToken, isModerator, isAdmin } from "../../Middlewares/AuthMiddleware.js";


const router = express.Router();

router
    /**
    * @swagger
    * /api/v1/rols:
    *   get:
    *     summary: Get list of Rols
    *     tags: [Rol]
    *     description: Get all rols.
    *     security:
    *      - BearerAuth: []
    *     responses:
    *       200:
    *         description: Get list rols successfully.
    *       500:
    *         description: Internal Error.
    */
    .get('/', [verifyToken, isModerator], getRols)

    /**
   * @swagger
   * /api/v1/rols:
   *   post:
   *     summary: Create new Rol
   *     tags: [Rol]
   *     description: create a new Rol with he information sended.
   *     parameters:
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               _id:
   *                 type string
   *               name:
   *                 type: string
   *                 description: name
   *             example:
   *               name: "Admin"
   *     responses:
   *       201:
   *         description: the rol has created successfully.
   *       400:
   *         description: Request Failed.
   *       500:
   *         description: Internal Error.
   */
    .post('/', [verifyToken, isModerator], createRol)

    /**
   * @swagger
   * /api/v1/rols/{id}:
   *   get:
   *     summary: Get a Rol by ID
   *     tags: [Rol]
   *     description: Get the details of rol by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID rol
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully obtained rol details.
   *       404:
   *         description: Winner not found.
   *       500:
   *         description: Internal Error.
   */
    .get('/:id', [verifyToken, isModerator], getRol)

    /**
   * @swagger
   * /api/v1/rols/{id}:
   *   put:
   *     summary: Update a Rol by ID
   *     tags: [Rol]
   *     description: Update a Rol's details based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: Rol ID
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
   *               name:
   *                 type: string
   *                 description: Rol name
   *             example:
   *               name: Admin
   *     responses:
   *       200:
   *         description: Rol Updated Successfully.
   *       400:
   *         description: Request Failed.
   *       404:
   *         description: Rol not found.
   *       500:
   *         description: Internal Error.
   */
    .put('/:id', [verifyToken, isModerator], updateRol)

    /**
   * @swagger
   * /api/v1/rols/{id}:
   *   delete:
   *     summary: Remove a Rol by ID.
   *     tags: [Rol]
   *     description: Remove a Rol based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: Rol ID
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Rol successfully removed.
   *       404:
   *         description: Rol not found.
   *       500:
   *         description: Internal Error.
   */
    .delete('/:id', [verifyToken, isAdmin], deleteRol)


export default router
