import { Router } from "express";
import {
  signinHandler,
  signupHandler,
} from "../../Controllers/AuthController.js";
import {
  checkExistingRole,
  checkExistingUser,
} from "../../Middlewares/verifySignup.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Ruta de inicio de sesión

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     description: Inicia sesión con las credenciales de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Logged successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1N2U3YzJiNS02YmU0LTRiOWEtOWRjZS1kMDQyY2I1MjIxZDciLCJpYXQiOjE2MzA1MjEzNjAsImV4cCI6MTYzMDUyNDk2MH0.MU5EFHQa2D0_9VLwtrv7j7ZZbg5K0tpAmfsRoxctq1w
 *       400:
 *         description: Invalid CredentiaLS.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Invalid credentials
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: Internal Server Error
 */

router.post("/signin", signinHandler);

// Ruta de registro

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: register
 *     tags: [Auth]
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               rol:
 *                type: array
 *                example: ["User"]
 * 
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid request body or user already exists.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", [checkExistingUser, checkExistingRole], signupHandler);

// Ruta protegida que requiere autenticación



export default router;
