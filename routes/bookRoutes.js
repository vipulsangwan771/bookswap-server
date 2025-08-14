const express = require('express');
const auth = require('../middleware/authMiddleware');
const { addBook, getAllBooks, getBookById, getMyBooks, deleteBook, validateBook } = require('../controllers/bookController');

module.exports = (upload) => {
  const router = express.Router();
  router.post('/', auth, upload.single('image'), validateBook, addBook);
  router.get('/', getAllBooks);
  router.get('/my', auth, getMyBooks);
  router.get('/:id', getBookById);
  router.delete('/:id', auth, deleteBook);
  return router;
};