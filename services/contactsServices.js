const { Contact } = require("../models/contactModel.js");

// Повертає масив контактів
async function listContacts(req) {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const list = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  return list;
}

//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений
async function getContactById(id) {
  const result = await Contact.findById(id);
  return result || null;
}

//Додає новий об'єкт контакту
async function addContact(...data) {
  const newContact = new Contact(...data);
  await newContact.save();
  return newContact;
}

//Оновлення контакту
async function updateContact(id, data) {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedContact;
}

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений
async function removeContact(id) {
  const result = await Contact.findByIdAndDelete(id);
  return result;
}

//повертає оновлений об'єкт контакту
async function updateStatusContact(contactId, body) {
  const { favorite } = body;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  );
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
