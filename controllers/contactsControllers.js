import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { cntrWraper } from "../helpers/cntrWraper.js";

const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();

    res.json(contacts);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;

    const contact = await contactsService.getContactById(id);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;

    const contact = await contactsService.removeContact(id);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

const createContact = async (req, res) => {
    const data = req.body;

    const contact = await contactsService.addContact(data);

    res.status(201).json(contact);
};

const updateContact = async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    const contact = await contactsService.updateContact(id, data);

    if (!contact) {
        throw HttpError(404);
    }

    res.json(contact);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    const contact = await contactsService.updateContact(id, data);

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
