const { Command } = require("commander");

const {
  addContact,
  getContactById,
  removeContact,
  listContacts,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(`Contact ${id}: `, contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("New contact was added: ", newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log("This contact was removed: ", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
