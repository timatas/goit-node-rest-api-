const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config(); //const dotenv = require("dotenv");dotenv.config();

const contactsRouter = require("./routes/contactsRouter");
const authRouter = require("./routes/authRouter");

// mongoose.connect(process.env.DB_HOST, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
const app = express();

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(400).json({
    message: "Bad Request",
  });

  // res.status(404).json({
  //   message: "Not found",
  // });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

app.listen(3000);

module.exports = app;
