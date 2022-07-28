// For connecting to our own API.

import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_INTERNAL_API_URL,
});

/* 
The below typedef is so our front-end knows about what kind of data the API
returns. Anywhere our front-end uses destination data will be because it got
the data from the functions in this file, which come with the typedef to
provide autocomplete.

If you want to have clarity and autocomplete on your data you use, TypeScript
is the more robust way to do that.
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
