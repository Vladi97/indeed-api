const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./src/api/utils/db.js");

const userRoutes = require("./src/api/routes/user");
const metricsRoutes = require("./src/api/routes/metric");
const roleRoutes = require("./src/api/routes/role");
const teamRoutes = require("./src/api/routes/team");

db.connect();

app.use(morgan("dev"));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/metric", metricsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/team", teamRoutes);

app.use((re, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
