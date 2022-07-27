const mongoose = require('mongoose');

// Export a function to be called from index.js
module.exports = (dbName) => {
  console.log(`Starting connection to ${dbName}.`);
  mongoose
    .connect(`mongodb://127.0.0.1:27017/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Successfully connected to ${dbName}`);
    })
    .catch((err) => console.log(`mongoose connection to ${dbName} failed:`, err));
};
