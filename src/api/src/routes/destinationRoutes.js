import express from 'express';

import {
  handleCreateDestination,
  handleCreateManyDestinations,
  handleGetAllDestinations,
  handleGetOneDestination,
  handleUpdateDestination,
  handleDeleteDestination,
} from '../controllers/index.js';

const destinationRouter = express.Router();
/*
In main.js a prefix will be added: `/api/entities`
*/
destinationRouter.post('/', handleCreateDestination);
destinationRouter.post('/many', handleCreateManyDestinations);
destinationRouter.get('/', handleGetAllDestinations);
destinationRouter.get('/:id', handleGetOneDestination);
destinationRouter.put('/:id', handleUpdateDestination);
destinationRouter.delete('/:id', handleDeleteDestination);

export { destinationRouter };
