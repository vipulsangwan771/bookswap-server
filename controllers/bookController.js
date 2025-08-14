const Book = require('../models/Book');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');


const validateBook = [
  body('title').notEmpty().trim(),
  body('author').notEmpty().trim(),
  body('condition').isIn(['new', 'like-new', 'good', 'fair', 'poor']),
];

const addBook = async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const { title, author, condition } = req.body;
    const image = req.file?.filename;
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }
    const book = new Book({ title, author, condition, image, owner: req.user.id });
    await book.save();
    res.status(201).json(book);
  
  } catch (err) {
    console.error('addBook error:', err);
    next(err);
  }
};

const getAllBooks = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const books = await Book.find()
      .populate('owner', 'firstName email')
      .skip(skip)
      .limit(limit);
    const total = await Book.countDocuments();
    res.json({ books, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'firstName email');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

const getMyBooks = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const books = await Book.find({ owner: req.user.id });
    res.json(books);
  } catch (err) {
    console.error('getMyBooks error:', err);
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Path to the image
    const imagePath = path.join(__dirname, '..', 'uploads', book.image);

    // Delete image file if it exists
    try {
      await fs.promises.unlink(imagePath);
    } catch (err) {
      if (err.code !== 'ENOENT') { // Ignore if file doesn't exist
        console.error('Error deleting image:', err);
      }
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted and image removed' });
  } catch (err) {
    next(err);
  }
};


module.exports = { addBook, getAllBooks, getBookById, getMyBooks, deleteBook, validateBook };