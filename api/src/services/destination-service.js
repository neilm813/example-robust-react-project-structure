/* 
This service is NOT concerned with req and res, it doesn't know or care about
it.
*/

const { Destination } = require('../models');

module.exports = {
  async create(data) {
    // Query the DB via our model.
    const newDestination = await Destination.create(data);
    return newDestination;
  },

  async getAll() {
    return await Destination.find();
  },

  async getOne(_id) {
    return await Destination.findById(_id);
  },

  // One line auto-return async arrow syntax.
  delete: async (_id) => await Destination.findByIdAndDelete(_id),

  async delete2(_id) {
    // Find first so you have a chance to write more logic before deleting.
    const destination = await Destination.findById(_id);
    await destination.remove();
    return destination;
  },

  async update(_id, data) {
    return await Destination.findByIdAndUpdate(_id, data, {
      runValidators: true, // Enforce model validations.
      new: true, // return the updated object rather than the old info.
    });
  },

  /* 
  Promise.allSettled helps know which ones failed and which didn't by returning
  the status of each in the same order.
  */
  async createMany(payloads) {
    const createPromises = payloads.map((payload) =>
      // No await here so it doesn't delay each iteration which is why
      // createPromises is an array of Promises.
      Destination.create(payload)
    );

    // const createPromises2 = payloads.map((payload) => this.create(payload));
    return await Promise.allSettled(createPromises);
  },

  /* 
  The successful ones will be created and any errors will be given back as
  one error that tells you what failed but not which one specifically failed
  */
  // async createMany(payloads) {
  //   return await Destination.create(payloads);
  // },
};
