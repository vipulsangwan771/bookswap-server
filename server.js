const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const requestRoutes = require('./routes/requestRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const FRONTENDURI = 'http://localhost:3000';
app.use(cors({
    origin: FRONTENDURI || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));


// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
});
app.use(limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Images only (jpeg, jpg, png)!'));
  },
});

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes(upload));
app.use('/requests', requestRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('BookSwap Server is running');
});

app.listen(5000, () => console.log('Server running on port 5000'));