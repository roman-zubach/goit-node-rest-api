import Contact from '../db/models/Contact.js';
import HttpError from '../helpers/HttpError.js';

export const listContacts = async (query, { page, limit }) => {
    const normalizedLimit = Number(limit);
    const offset = (Number(page) - 1) * normalizedLimit;

    return Contact.findAll({ where: query, limit, offset });
};

export const getContactById = async (owner, contactId) => {
    const contact = await Contact.findByPk(contactId);

    if (contact && contact.owner !== owner.id) {
        throw HttpError(403, 'Access denied');
    }

    return contact;
};

export const removeContact = async (owner, contactId) => {
    const contact = await getContactById(owner, contactId);

    if (contact) await contact.destroy();

    return contact;
};

export const addContact = async (owner, data) => Contact.create({...data, owner });

export const updateContact = async (owner, contactId, data) => {
    const contact = await getContactById(owner, contactId);

    if (contact) await contact.update(data);

    return contact;
};
