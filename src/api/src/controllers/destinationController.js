const {
  createDestination,
  getAllDestinations,
  getOneDestination,
  deleteDestination,
  updateDestination,
  createManyDestinations,
} = require('../services');

const { APIError } = require('../utils');

/*
Separation of concerns:
  The controller is only concerned with handling the request and the response,
  everything is separable logic so it's decoupled and easily reusable.
*/

const handleCreateDestination = async (req, res, next) => {
  try {
    const destination = await createDestination(req.body);
    return res.json(destination);
  } catch (error) {
    /*
    Pass the error along to the next middleware function that happens before
    the response. See the middleware being added in `main.js` with `app.use`.
    */
    return next(error);
  }
};

// _req naming convention means the param is currently unused.
const handleGetAllDestinations = async (_req, res, next) => {
  try {
    const destinations = await getAllDestinations();
    return res.json(destinations);
  } catch (error) {
    return next(error);
  }
};

const handleGetOneDestination = async (req, res, next) => {
  try {
    const destination = await getOneDestination(req.params.id);
    return res.json(destination);
  } catch (error) {
    return next(error);
  }
};

const handleDeleteDestination = async (req, res, next) => {
  try {
    const destination = await deleteDestination(req.params.id);
    return res.json(destination);
  } catch (error) {
    return next(error);
  }
};

const handleUpdateDestination = async (req, res, next) => {
  try {
    const destination = await updateDestination(req.params.id, req.body);
    return res.json(destination);
  } catch (error) {
    return next(error);
  }
};

const handleCreateManyDestinations = async (req, res, next) => {
  try {
    if (Array.isArray(req.body) === false) {
      throw new APIError('Request body must be an array.', 400);
    }
    const settledCreateOutcomes = await createManyDestinations(req.body);
    return res.json(settledCreateOutcomes);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  // long-form - key: value
  handleCreateDestination: handleCreateDestination,
  // shorthand when key matches var name.
  handleGetAllDestinations,
  handleGetOneDestination,
  handleDeleteDestination,
  handleUpdateDestination,
  handleCreateManyDestinations,
};
