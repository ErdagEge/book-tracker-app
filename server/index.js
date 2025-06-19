import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import booksRouter from './routes/books.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/books', booksRouter);

app.get('/api/test', (req, res) => {
  res.send('Backend is working!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server started on port 5000'));
  })
  .catch(err => console.error(err));
