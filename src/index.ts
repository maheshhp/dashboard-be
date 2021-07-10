import express from "express";
import { attchGqlMw } from "./graphql";
import { registerRoutes } from "./rest/routes";
import { attachJwtAuthMw } from "./services/auth";

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

// Add request body JSON parsing
app.use(express.json());

// Setting up JWT auth for all routes except /login
attachJwtAuthMw(app);

// Setting up GQL middleware
attchGqlMw(app);

// Setting up route handlers
registerRoutes(app);

// Listening on SERVER_PORT defined in .env
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
