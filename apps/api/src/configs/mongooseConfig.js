import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected.'))
  .catch((err) => console.log('Database connection error:', err));
