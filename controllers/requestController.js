const Request = require('../models/Request');
const Book = require('../models/Book');

const sendRequest = async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (book.owner.toString() === req.user.id) return res.status(400).json({ error: 'Cannot request your own book' });
  const existing = await Request.findOne({ book: bookId, requester: req.user.id });
  if (existing) return res.status(400).json({ error: 'Request already sent' });
  const request = new Request({ book: bookId, requester: req.user.id });
  await request.save();
  res.status(201).json(request);
};

const getMyRequests = async (req, res) => {
  const requests = await Request.find({ requester: req.user.id }).populate('book');
  res.json(requests);
};

const getIncomingRequests = async (req, res) => {
  const books = await Book.find({ owner: req.user.id });
  const bookIds = books.map(b => b._id);
  const requests = await Request.find({ book: { $in: bookIds } }).populate('requester', 'email').populate('book');
  res.json(requests);
};

const updateRequest = async (req, res) => {
  const { status } = req.body;
  const request = await Request.findById(req.params.id).populate('book');
  if (!request) return res.status(404).json({ error: 'Request not found' });
  if (request.book.owner.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
  request.status = status;
  await request.save();
  res.json(request);
};

module.exports = { sendRequest, getMyRequests, getIncomingRequests, updateRequest };