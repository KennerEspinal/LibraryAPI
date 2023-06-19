import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./Config/db.js";
import "./libs/initialSetup.js";
import { swaggerDocs as V1SwaggerDocs } from "./v1/swagger.js";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

dotenv.config();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //convert the data from DB en JSON
app.use(urlencoded({ extended: false }));

//route by test
app.get("/welcome", (req, res) => {
  res.send("Welcome to my API");
});

//Routes
import V1RolRouter from "./v1/Routes/RolRoutes.js";
import V1BookRouter from "./v1/Routes/BookRoutes.js";
import V1CategoryRouter from "./v1/Routes/CategoryRoutes.js";
import V1UserRouter from "./v1/Routes/UserRoutes.js";
import V1AuthRoute from "./v1/Routes/AuthRoutes.js";

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const MONGO_URI = process.env.MONGO_URI;
    await ConnectDB(MONGO_URI);
    app.use("/api/v1/rols", V1RolRouter);
    app.use("/api/v1/books", V1BookRouter);
    app.use("/api/v1/categories", V1CategoryRouter);
    app.use("/api/v1/users", V1UserRouter);
    app.use("/api/v1/auth", V1AuthRoute);

    app.listen(PORT, () => {
      console.log(`API is running on port: ${PORT}`);
      V1SwaggerDocs(app, PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
