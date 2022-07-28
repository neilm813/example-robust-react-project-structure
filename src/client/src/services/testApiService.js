import axios from 'axios';

/**
 * Tests http status code responses.
 * @see https://httpstat.us/
 * @param {number} statusCode
 * @param {number} sleepMs Delay milliseconds. Max is 5 minutes.
 */
export const testHttpStatus = async (statusCode = 500, sleepMs = null) => {
  let url = `https://httpstat.us/${statusCode}`;

  if (sleepMs) {
    url + `?sleep=${sleepMs}`;
  }

  const res = await axios.get(url);
  return res.data;
};
