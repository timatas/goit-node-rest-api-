const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");

const contactsRouter = require("./routes/contactsRouter");
// const DB_HOST =
//   "mongodb+srv://Nfyz1974:Nfyz1974@cluster0.s5u1jyx.mongodb.net/db_contacts?retryWrites=true&w=majority&appName=Cluster0";
// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
//   .catch((error) => console.log(error.message));

// mongoose.connect(process.env.DB_HOST, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

// app.listen(3000);

module.exports = app;
