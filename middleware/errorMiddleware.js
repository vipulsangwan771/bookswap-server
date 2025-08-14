const multer = require('multer');

module.exports = (err, req, res, next) => {
  console.error('Error:', err.stack);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'File upload error: ' + err.message });
  } else if (err.message === 'Images only (jpeg, jpg, png)!') {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Something went wrong!' });
};