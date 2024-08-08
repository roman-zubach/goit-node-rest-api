import * as contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import { cntrWraper } from '../helpers/cntrWraper.js';

const getAllContacts = async (req, res) => {
    const { user } = req;
    const { page = 1, limit = 10, favorite } = req.query;

    let query = { owner : user.id };

    if (favorite !== undefined) {
        query = {...query, favorite};
    }

    const contacts = await contactsService.listContacts(query, { page, limit });

    res.json(contacts);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const contact = await contactsService.getContactById(user, id);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const contact = await contactsService.removeContact(user, id);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

const createContact = async (req, res) => {
    const data = req.body;
    const { user } = req;

    const contact = await contactsService.addContact(user, data);

    res.status(201).json(contact);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const data = req.body;

    const contact = await contactsService.updateContact(user, id, data);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const data = req.body;

    const contact = await contactsService.updateContact(user, id, data);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

export default {
    getAllContacts: cntrWraper(getAllContacts),
    getOneContact: cntrWraper(getOneContact),
    deleteContact: cntrWraper(deleteContact),
    createContact: cntrWraper(createContact),
    updateContact: cntrWraper(updateContact),
    updateStatusContact: cntrWraper(updateStatusContact),
};
