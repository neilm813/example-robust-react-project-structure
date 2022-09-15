const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to ${connectionString}`);
  })
  .catch((error) =>
    console.log(`mongoose connection to ${connectionString} failed:`, error)
  );
