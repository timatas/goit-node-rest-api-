import contactsService from "../services/contactsServices.js";
const Joi = require("joi");

const contacts = require("../services/contacts.json");

const { MyHttpError } = require("../helpers");

export const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw MyHttpError(404, "Not found");
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw MyHttpError(404, "Not found");
  }
  res.json({
    message: "Delete is success",
  });
};

export const createContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw MyHttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
