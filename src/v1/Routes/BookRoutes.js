import express from "express";
import { createBook, deleteBook, getBooks, getBook, updateBook } from "../../Controllers/BookController.js";
import { verifyToken, isModerator, isAdmin } from "../../Middlewares/AuthMiddleware.js";


const router = express.Router();

router
    /**
    * @swagger
    * /api/v1/books:
    *   get:
    *     summary: Get list of Books
    *     tags: [Book]
    *     description: Get all books.
    *     responses:
    *       200:
    *         description: Get list books successfully.
    *       500:
    *         description: Internal Error.
    */
    .get('/', getBooks)

    /**
   * @swagger
   * /api/v1/books:
   *   post:
   *     summary: Create new Book
   *     tags: [Book]
   *     description: create a new Book with he information sended.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Cien Años de Soledad
   *               description:
   *                type: string
   *                example: Libro de Gabriel García Márquez
   *               category:
   *                type: string
   *                example: 60cde34b1c7ef900b42e0748
   *               imgURL:
   *                type: string
   *                example: URL
   *     responses:
   *       201:
   *         description: the book has created successfully.
   *       400:
   *         description: Request Failed.
   *       500:
   *         description: Internal Error.
   */
    .post('/', createBook)

    /**
   * @swagger
   * /api/v1/books/{id}:
   *   get:
   *     summary: Get a Book by ID
   *     tags: [Book]
   *     description: Get the details of book by ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID book
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully obtained book details.
   *       404:
   *         description: Winner not found.
   *       500:
   *         description: Internal Error.
   */
    .get('/:id', getBook)

    /**
   * @swagger
   * /api/v1/books/{id}:
   *   put:
   *     summary: Update a Book by ID
   *     tags: [Book]
   *     description: Update a Book's details based on their ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         description: Book ID
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
   *               title:
   *                 type: string
   *                 example: Cien Años de Soledad
   *               description:
   *                type: string
   *                example: Libro de Gabriel García Márquez
   *               category:
   *                type: string
   *                example: 60cde34b1c7ef900b42e0748
   *               imgURL:
   *                type: string
   *                example: URL
   *     responses:
   *       200:
   *         description: Book Updated Successfully.
   *       400:
   *         description: Request Failed.
   *       404:
   *         description: Book not found.
   *       500:
   *         description: Internal Error.
   */
    .put('/:id', [verifyToken, isModerator],updateBook)

   /**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Remove a Book by ID.
 *     tags: [Book]
 *     description: Remove a Book based on their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Book ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book successfully removed.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal Error.
 */
    .delete('/:id', [verifyToken, isAdmin], deleteBook)


export default router
