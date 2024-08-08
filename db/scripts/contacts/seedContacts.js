import fs from 'fs/promises';
import path from 'path';
import Contact from '../../models/Contact.js';

const seedContacts = async () => {
    const contactsPath = path.resolve('db', 'scripts', 'contacts', 'contacts.json');

    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf-8'));

    const filteredData = contacts.map(({ id, ...rest }) => ({
        ...rest,
        owner: Math.floor(Math.random() * 2) + 1,
    }));

    await Contact.bulkCreate(filteredData);
};

export default seedContacts;
