require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL_LOCAL, {})
  .then(() => console.log("connected"))
  .catch((err) => console.log("connection failed", err));

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome to Nex Shopping");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
