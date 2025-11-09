const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// Admin-only routes: Add, Update, Delete Equipment

router.post('/', authenticate, authorizeRoles('admin'), equipmentController.addEquipment);
router.put('/:id', authenticate, authorizeRoles('admin'), equipmentController.updateEquipment);
router.delete('/:id', authenticate, authorizeRoles('admin'), equipmentController.deleteEquipment);

// Public / logged-in users can view equipment
router.get('/', authenticate, equipmentController.getEquipment);

module.exports = router;
