import express from "express";
import cors from "cors";
import { attchGqlMw } from "./graphql";
import { registerRoutes } from "./rest/routes";
import { attachJwtAuthMw } from "./services/auth";
import { rateLimiter } from "./services/rateLimiter";

const app = express();

// Add request body JSON parsing
app.use(express.json());

// Allow CORS for running FE locally
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Setting up JWT auth for all routes except /login
attachJwtAuthMw(app);

// Attach rate limiter to graphql routes
app.use("/graphql", rateLimiter);

// Setting up GQL middleware
attchGqlMw(app);

// Setting up route handlers
registerRoutes(app);

export default app;
