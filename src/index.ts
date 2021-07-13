import app from "./server";
const PORT = process.env.SERVER_PORT || 8080;

// Listening on SERVER_PORT defined in .env
app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
