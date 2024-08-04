import Contact from '../db/models/Contact.js';

export async function listContacts() {
    return Contact.findAll();
}

export async function getContactById(contactId) {
    return Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
    const contact = await getContactById(contactId);

    if (contact) await contact.destroy();

    return contact;
}

export async function addContact(data) {
    return Contact.create(data);
}

export async function updateContact(contactId, data) {
    const contact = await getContactById(contactId);

    if (contact) await contact.update(data);

    return contact;
}
