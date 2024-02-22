require("express-async-errors");
const express = require("express");

const app = express();
const errors = require("./middlewares/error");

require("./middlewares")(app);

const routers = require("./middlewares/routes");
routers(app);

app.use(errors);

module.exports = app;
