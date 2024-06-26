const express = require("express");
const cors = require("cors");

const contactsRouter = require("./routes/contactsRouter");

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

app.listen(3000);

module.exports = app;
