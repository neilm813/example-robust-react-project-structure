import cors from 'cors';
import express from 'express';
import 'dotenv/config.js';
import './configs/index.js';

import * as middleware from './middleware/index.js';
import { destinationRouter } from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/destinations', destinationRouter);
app.use(middleware.errorLogger);
app.use(middleware.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Api listening on port ${process.env.PORT}.`);
});
