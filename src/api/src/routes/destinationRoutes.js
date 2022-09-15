const express = require('express');

const {
  handleCreateDestination,
  handleCreateManyDestinations,
  handleGetAllDestinations,
  handleGetOneDestination,
  handleUpdateDestination,
  handleDeleteDestination,
} = require('../controllers');

const router = express.Router();
/*
In main.js a prefix will be added: `/api/entities`
*/
router.post('/', handleCreateDestination);
router.post('/many', handleCreateManyDestinations);
router.get('/', handleGetAllDestinations);
router.get('/:id', handleGetOneDestination);
router.put('/:id', handleUpdateDestination);
router.delete('/:id', handleDeleteDestination);

module.exports = { destinationRouter: router };
