/*
This service is NOT concerned with req and res, it doesn't know or care about
it.
*/

const { Destination } = require('../models');

const createDestination = async (data) => {
  // Query the DB via our model.
  const newDestination = await Destination.create(data);
  return newDestination;
};

const getAllDestinations = async () => {
  return Destination.find();
};

const getOneDestination = async (id) => {
  return Destination.findById(id);
};

const deleteDestination = async (id) => await Destination.findByIdAndDelete(id);

// Without findByIdAndDelete you have to do both the find and the delete.
const delete2Destination = async (id) => {
  const destination = await Destination.findById(id);
  await destination.remove();
  return destination;
};

const updateDestination = async (id, data) => {
  return Destination.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};

const createManyDestinations = async (payloads) => {
  // No await in the .map because it will delay each iteration
  // the returned allSettled Promise will be awaited when calling this fn.
  const createPromises = payloads.map((payload) => createDestination(payload));

  return Promise.allSettled(createPromises);
};

module.exports = {
  // long-form - key: value
  createDestination: createDestination,
  // shorthand when key matches var name.
  getAllDestinations,
  getOneDestination,
  deleteDestination,
  updateDestination,
  createManyDestinations,
};
