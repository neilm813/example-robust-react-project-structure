const { destinationService: service } = require("../services");
const {
  customErrors: { APIError },
} = require("../utils/errors");

/* 
Controller should ONLY be concerned with handling the req and res
NO OTHER LOGIC. Keep the controller 'skinny'. All other logic is
reusable since it will be separated into other functions.

Separation of concerns.
*/

module.exports = {
  // long-form - key: value format
  // shorthand: create(req, res) {}
  create: async function (req, res, next) {
    console.log("create method executed");

    try {
      const destination = await service.create(req.body);
      return res.json(destination);
    } catch (error) {
      /* 
      Pass the error along to the next middleware function that happens before
      the response. See api/index.js app.use code and api.errors/errorHandlers
      */
      return next(error);
    }
  },

  async getAll(req, res, next) {
    console.log("getAll method executed");
    try {
      const destinations = await service.getAll();
      return res.json(destinations);
    } catch (error) {
      return next(error);
    }
  },

  async getOne(req, res, next) {
    console.log("getOne method executed");

    try {
      const destination = await service.getOne(req.params._id);
      return res.json(destination);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    console.log("delete method executed");

    try {
      const destination = await service.delete(req.params._id);
      return res.json(destination);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    console.log("update method executed", "url params:", req.params);

    try {
      const destination = await service.update(req.params._id, req.body);
      return res.json(destination);
    } catch (error) {
      return next(error);
    }
  },

  // Without using findByIdAndUpdate you need to perform both operations
  async delete2(req, res, next) {
    try {
      const destination = await service.delete2(req._id);
      return res.json(destination);
    } catch (error) {
      return next(error);
    }
  },

  async createMany(req, res, next) {
    console.log("createMany method executed");
    try {
      if (Array.isArray(req.body) === false) {
        throw new APIError("Request body must be an array.", 400);
      }
      const destinations = await service.createMany(req.body);
      return res.json(destinations);
    } catch (error) {
      return next(error);
    }
  },
};
