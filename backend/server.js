const express = require("express");
const path = require("path");

const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const res = require("express/lib/response");

const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/character", require("./routes/characterRoutes"));
app.use("/api/planet", require("./routes/planetRoutes"));
app.use("/api/film", require("./routes/filmRoutes"));
app.use("/api/favorite", require("./routes/favoriteRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    resp.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
