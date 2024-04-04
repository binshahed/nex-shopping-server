require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://mdbinshahed5:jmwMbNqIdZzwtYce@cluster0.qxxv3j9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {})
  .then(() => console.log("connected"))
  .catch((err) => console.log("connection failed", err));

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Welcome to Nex Shopping");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
