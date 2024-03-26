const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { myValidateBody } = require("../../helpers");

const schemas = require("../../schemas/contactsSchemas");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getOneContact);

router.post("/", myValidateBody(schemas.addSchema), ctrl.createContact);

router.put("/:id", myValidateBody(schemas.addSchema), ctrl.updateContact);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
