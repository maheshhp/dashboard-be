import express from "express";
import { attchGqlMw } from "./graphql";
import { registerRoutes } from "./rest/routes";
import { attachJwtAuthMw } from "./services/auth";
import { rateLimiter } from "./services/rateLimiter";

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

// Add request body JSON parsing
app.use(express.json());

// Setting up JWT auth for all routes except /login
attachJwtAuthMw(app);

// Attach rate limiter to graphql routes
app.use("/graphql", rateLimiter);

// Setting up GQL middleware
attchGqlMw(app);

// Setting up route handlers
registerRoutes(app);

// Listening on SERVER_PORT defined in .env
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
