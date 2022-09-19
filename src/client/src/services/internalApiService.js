/*
An API service provides all the functions needed for the rest of the app
to consistently access the API.

No other component's need to import axios or know / care / refer to API urls
which avoids repeatedly importing axios and duplicating urls and logic.

Each API used could have it's own service file.
*/

import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_INTERNAL_API_URL,
});

/*
The below typedef makes it so every component that uses functions from this
file will get autocomplete for the props and data returned by these functions.

If you find yourself wanting to do this thoroughly, you should start using
TypeScript.
*/

/**
 * @typedef {object} Destination
 * @property {string} location
 * @property {string} description
 * @property {string} src Img url.
 * @property {('image'|'Youtube Embed'|'Google Embed')} srcType
 * @property {boolean} summer
 * @property {boolean} winter
 * @property {boolean} spring
 * @property {boolean} fall
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @returns {Promise<Destination[]>}
 */
export const getAllDestinations = async () => {
  const res = await http.get('/destinations');
  return res.data;
};

/**
 * @param {string} id
 * @returns {Promise<Destination|null>}
 */
export const getOneDestination = async (id) => {
  const res = await http.get(`/destinations/${id}`);
  return res.data;
};

/**
 * @param {Destination} newDestination
 * @returns {Promise<Destination>}
 */
export const createDestination = async (newDestination) => {
  const res = await http.post(`/destinations`, newDestination);
  return res.data;
};
