import express from 'express';
import UserBook from '../models/UserBook.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newBook = new UserBook(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save book' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await UserBook.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    await UserBook.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// PUT /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await UserBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});


export default router;
