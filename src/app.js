import express from "express";
// import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import transactionRouter from "#routes/transactionRoutes.js";
import categoryRouter from "#routes/categoryRoutes.js";
import dotenv from "dotenv";
import "#config/config-passport.js";
import routerUsers from "#routes/routerUsers.js";

const app = express();
dotenv.config();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GoIT Wallet by FinanSync Team",
      version: "1.0.0",
      description: "Personal budget app",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //shows Swagger documentation

app.use("/api/transactions", transactionRouter);
app.use("/api/category", categoryRouter);
app.use("/api/users", routerUsers);

// Error handling

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).json({
    message: `Address not found. Go to http://localhost:${PORT}/api/transactions`,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
