import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const storeContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(contacts);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();

    const contact = contacts.find(contact => contact.id === contactId);

    return contact || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();

    const contactIdx = contacts.findIndex(contact => contact.id === contactId);

    if (contactIdx === -1) return null;

    const [contact] = contacts.splice(contactIdx, 1);

    await storeContacts(contacts);

    return contact || null;
}

export async function addContact(data) {
    const contacts = await listContacts();

    const contact = {
        id: nanoid(),
        ...data,
    }

    contacts.push(contact);

    await storeContacts(contacts);

    return contact;
}

export async function updateContact(contactId, data) {
    const contacts = await listContacts();

    const contactIdx = contacts.findIndex(contact => contact.id === contactId);

    if (contactIdx === -1) return null;

    const contact = {...contacts[contactIdx], ...data};

    contacts[contactIdx] = contact;

    await storeContacts(contacts);

    return contact || null;
}
