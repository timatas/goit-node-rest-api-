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

//Повертає об'єкт контакту з таким id авторизованому користувачу.
async function getContactById(id, req) {
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  return result || null;
}

//Додає новий об'єкт контакту
async function addContact(...data) {
  const newContact = new Contact(...data);
  await newContact.save();
  return newContact;
}

//Оновлення контакту авторизованим користувачем
async function updateContact(id, req, data) {
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    data,
    {
      new: true,
    }
  );
  return updatedContact;
}

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений
async function removeContact(id, req) {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  return result;
}

//повертає оновлений статус об'єкт контакту
async function updateStatusContact(contactId, req, body) {
  const { _id: owner } = req.user;
  const { favorite } = body;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      favorite,
    },
    {
      new: true,
    }
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
