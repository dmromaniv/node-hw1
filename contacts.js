const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const { parseText, stringifyText } = require("./utils/jsonHelpers");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  if (contacts) {
    const parsedContactsList = parseText(contacts);
    return parsedContactsList;
  }
}

async function getContactById(contactId) {
  const allContacts = await listContacts();

  if (allContacts) {
    const contact = allContacts.find((contact) => contact.id === contactId);
    return contact;
  }
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  let removedContact;

  if (allContacts) {
    const contactIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      removedContact = allContacts[contactIndex];
      allContacts.splice(contactIndex, 1);
    }
  }

  writeTextToFile(allContacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  writeTextToFile([...allContacts, newContact]);

  return newContact;
}

async function writeTextToFile(text) {
  try {
    await fs.writeFile(contactsPath, stringifyText(text));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
