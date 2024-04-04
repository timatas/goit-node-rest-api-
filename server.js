const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Nfyz1974:Nfyz1974@cluster0.s5u1jyx.mongodb.net/db_contacts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
