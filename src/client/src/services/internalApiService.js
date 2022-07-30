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
The below typedef is so our front-end knows about what kind of data the API
returns. Anywhere our front-end uses destination data will be because it got
the data from the functions in this file, which come with the typedef to
provide autocomplete on the keys and their data types.

If you want to have clarity and autocomplete on your data you use, TypeScript
is the more robust way to do that, because it's hard to keep the intellisense
when we give these functions to a package to do the querying for us. With TS
you can more easily pass your types around to other functions to know the
types.

Or you can import the JSDoc typedef to re-apply it when needed.
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
