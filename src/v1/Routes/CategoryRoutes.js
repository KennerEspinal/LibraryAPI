import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../../Controllers/CategoryController.js";
import { verifyToken, isModerator, isAdmin } from "../../Middlewares/AuthMiddleware.js";


const router = express.Router();

router
    /**
    * @swagger
    * /api/v1/categories:
    *   get:
    *     summary: Get list of Categories
    *     tags: [Category]
    *     description: Get all categories.
    *     responses:
    *       200:
    *         description: Get list categories successfully.
    *       500:
    *         description: Internal Error.
    */
    .get('/', getCategories)

    /**
   * @swagger
   * /api/v1/categories:
   *   post:
   *     summary: Create new Category
   *     tags: [Category]
   *     description: create a new Category with he information sended.
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
   *               name: "Literatura Antigua"
   *     responses:
   *       201:
   *         description: the category has created successfully.
   *       400:
   *         description: Request Failed.
   *       500:
   *         description: Internal Error.
   */
    .post('/', createCategory)

    /**
   * @swagger
   * /api/v1/categories/{id}:
   *   get:
   *     summary: Get a Category by ID
   *     tags: [Category]
   *     description: Get the details of category by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID category
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully obtained category details.
   *       404:
   *         description: Winner not found.
   *       500:
   *         description: Internal Error.
   */
    .get('/:id', getCategory)

    /**
   * @swagger
   * /api/v1/categories/{id}:
   *   put:
   *     summary: Update a Category by ID
   *     tags: [Category]
   *     description: Update a Category's details based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: Category ID
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
   *                 description: Category name
   *             example:
   *               name: Romanticismo
   *     responses:
   *       200:
   *         description: Category Updated Successfully.
   *       400:
   *         description: Request Failed.
   *       404:
   *         description: Category not found.
   *       500:
   *         description: Internal Error.
   */
    .put('/:id', [verifyToken, isModerator], updateCategory)

    /**
   * @swagger
   * /api/v1/categories/{id}:
   *   delete:
   *     summary: Remove a Category by ID.
   *     tags: [Category]
   *     description: Remove a Category based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: Category ID
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Category successfully removed.
   *       404:
   *         description: Category not found.
   *       500:
   *         description: Internal Error.
   */
    .delete('/:id', [verifyToken, isAdmin], deleteCategory)


export default router
