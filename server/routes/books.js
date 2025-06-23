import express from 'express';
import UserBook from '../models/UserBook.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below require authentication
router.use(verifyToken);

// Create a new book (linked to logged-in user)
router.post('/', async (req, res) => {
  try {
    const newBook = new UserBook({ ...req.body, userId: req.userId });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to save book' });
    }
  }
});

// Get only books that belong to the logged-in user
router.get('/', async (req, res) => {
  try {
    const books = await UserBook.find({ userId: req.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Delete a book (only if it belongs to the user)
router.delete('/:id', async (req, res) => {
  try {
    const book = await UserBook.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!book) return res.status(403).json({ error: 'Not allowed to delete this book' });
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Update a book (only if it belongs to the user)
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await UserBook.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(403).json({ error: 'Not allowed to update this book' });
    res.json(updatedBook);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to update book' });
    }
  }
});

export default router;
