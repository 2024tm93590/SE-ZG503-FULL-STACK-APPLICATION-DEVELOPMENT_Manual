const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// Logged-in users can create a borrowing request
router.post('/', authenticate, requestController.createRequest);

// Admin or staff can update the status of a borrowing request
router.put('/:id/status', authenticate, authorizeRoles('admin', 'staff'), requestController.updateRequestStatus);

module.exports = router;
