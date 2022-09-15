/*
This is actually what creates and starts our api server. It's the only file we
run from the terminal but it results in all other files being executed from
here.
*/

/*
Environment configurations that can change between environments, such as
between dev and prod or between individual developers are added to a .env
file which is ignored so the values can be different between environments.
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { errorHandler, errorLogger } = require('./src/utils');

require('./src/configs/mongooseConfig');

const app = express();
app.use(cors());
// req.body will be undefined without this when receiving JSON.
app.use(express.json());

const { destinationRouter } = require('./src/routes');
app.use('/api/destinations', destinationRouter);

// Add error-handling middleware to run in the middle of the req res cycle.
app.use(errorLogger);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Api listening on port ${process.env.PORT}.`);
});
