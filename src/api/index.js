/* 
This is actually what creates and starts our api server. It's the only file we
run from the terminal but it results in all other files being executed from
here.
*/

/* 
Environment configurations that can change between environments (dev, prod)
are added to a .env file which is ignored since it may change between
environments. Otherwise you have to manually edit configuration settings
in variables in the code rather than in configuration files.

SEE .env-notes.txt
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {
  errorHandlers: { errorHandler, errorLogger },
} = require('./src/utils/errors');

const connectToDbCallback = require('./src/configs/mongoose-config');
connectToDbCallback(process.env.DB_NAME);

const app = express();
app.use(cors());
// req.body will be undefined without this when receiving JSON.
app.use(express.json());

const { destinationRoutes } = require('./src/routes');
app.use('/api/destinations', destinationRoutes);

// Add error-handling middleware to run in the middle of the req res cycle.
app.use(errorLogger);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port} for REQuests to RESpond to.`);
});
