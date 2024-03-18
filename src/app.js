require("express-async-errors");
const express = require("express");

const app = express();
const errors = require("./v1/middlewares/error");

require("./v1/middlewares")(app);

const routers = require("./v1/middlewares/routes");
const authorize = require("./v1/middlewares/verifyToken");

app.use(authorize);
routers(app);

app.use(errors);

module.exports = app;
