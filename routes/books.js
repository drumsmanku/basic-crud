const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create a new book entry
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read or retrieve book entries
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single book entry by ISBN
router.get('/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOne({ ISBN: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing book entry
router.put('/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ ISBN: req.params.isbn }, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book entry
router.delete('/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ ISBN: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
