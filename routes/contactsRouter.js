import express from 'express';

import contactsController from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlware/authenticate.js';

import {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema
} from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactsController.getAllContacts);

contactsRouter.get('/:id', authenticate, contactsController.getOneContact);

contactsRouter.delete('/:id', authenticate, contactsController.deleteContact);

contactsRouter.post('/', authenticate, validateBody(createContactSchema), contactsController.createContact);

contactsRouter.put('/:id', authenticate, validateBody(updateContactSchema), contactsController.updateContact);

contactsRouter.patch('/:id/favorite', authenticate, validateBody(updateStatusContactSchema), contactsController.updateStatusContact);

export default contactsRouter;
