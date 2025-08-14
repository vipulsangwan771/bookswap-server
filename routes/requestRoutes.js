const express = require('express');
const auth = require('../middleware/authMiddleware');
const { sendRequest, getMyRequests, getIncomingRequests, updateRequest } = require('../controllers/requestController');

const router = express.Router();

router.post('/', auth, sendRequest);
router.get('/my', auth, getMyRequests);
router.get('/incoming', auth, getIncomingRequests);
router.put('/:id', auth, updateRequest);

module.exports = router;