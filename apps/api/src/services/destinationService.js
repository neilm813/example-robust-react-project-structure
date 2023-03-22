/*
This service is NOT concerned with req and res, it doesn't know or care about
it.
*/

import { Destination } from '../models/index.js';

export const createDestination = async (data) => {
  const newDestination = await Destination.create(data);
  return newDestination;
};

export const getAllDestinations = async () => Destination.find();

export const getOneDestination = async (id) => Destination.findById(id);

export const deleteDestination = async (id) => Destination.findByIdAndDelete(id);

// Without findByIdAndDelete you have to do both the find and the delete.
export const delete2Destination = async (id) => {
  const destination = await Destination.findById(id);
  await destination.remove();
  return destination;
};

export const updateDestination = async (id, data) =>
  Destination.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });

export const createManyDestinations = async (payloads) => {
  const createPromises = payloads.map((payload) => createDestination(payload));
  return Promise.allSettled(createPromises);
};
