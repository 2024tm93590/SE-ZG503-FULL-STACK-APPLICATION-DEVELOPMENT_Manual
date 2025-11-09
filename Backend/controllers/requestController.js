const { BorrowRequest, Equipment } = require('../models');
const { Op } = require('sequelize');

// Create Borrow Request
exports.createRequest = async (req, res) => {
  try {
    const { userId, equipmentId, fromDate, toDate } = req.body;

    // Check for overlapping bookings
    const overlapping = await BorrowRequest.findOne({
      where: {
        equipmentId,
        status: { [Op.in]: ['PENDING', 'APPROVED'] },
        fromDate: { [Op.lte]: new Date(toDate) },
        toDate: { [Op.gte]: new Date(fromDate) }
      }
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Equipment already booked for the selected dates' });
    }

    const request = await BorrowRequest.create({ userId, equipmentId, fromDate, toDate });
    res.status(201).json({ message: 'Borrowing request created successfully', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Request Status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [updated] = await BorrowRequest.update({ status }, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Request not found' });

    const updatedRequest = await BorrowRequest.findByPk(id);
    res.status(200).json({ message: 'Request status updated successfully', updatedRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.findAll({ include: [Equipment] });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
