const express = require("express");

const ctrl = require("../controllers/contactsControllers");

const { validateBody } = require("../middleware");

const schemas = require("../schemas/contactsSchemas");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(schemas.createContactSchema),
  ctrl.updateContact
);

contactsRouter.delete("/:id", ctrl.deleteContact);

module.exports = contactsRouter;
