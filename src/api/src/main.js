import express from 'express';
import cors from 'cors';

import 'dotenv/config.js';
import './configs/index.js';
import { destinationRouter } from './routes/index.js';
import { errorHandler, errorLogger } from './utils/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/destinations', destinationRouter);
// Add error-handling middleware to run in the middle of the req res cycle:
app.use(errorLogger);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Api listening on port ${process.env.PORT}.`);
});
