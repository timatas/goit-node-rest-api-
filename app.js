const express = require("express");
const cors = require("cors");

const contactsRouter = require("./routes/contactsRouter");

const app = express();

// const corsMiddleware = cors();
// app.use(corsMiddleware);
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// app.use((req, res, next) => {
//   console.log("first middleware");
//   next();
// });

// app.get("/api/contacts", (req, res) => {
//   res.json(contacts);
// });

// app.get("/api/contacts:id", (req, res) => {
//   res.json(contacts[0]);
// });

// app.post("/api/contacts", (req, res) => {
//   res.json(contacts);
// });

// app.put("/api/contacts:id", (req, res) => {
//   res.json(contacts[0]);
// });

// app.delete("/api/contacts:id", (req, res) => {
//   res.json(contacts[0]);
// });

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
// app.get("/", (req, res) => {
//   res.send("<h2>Home page</h2>");
// });

// app.get("/contacts", (req, res) => {
//   console.log(req.url);
//   console.log(req.method);
//   res.send("<h2>Contacts page</h2>");
// });

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });
module.exports = app;
