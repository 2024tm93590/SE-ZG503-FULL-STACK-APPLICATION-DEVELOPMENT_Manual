const { Equipment } = require('../models');

// Add Equipment
exports.addEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json({ message: 'Equipment added successfully', equipment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Equipment with optional search/filter
exports.getEquipment = async (req, res) => {
  try {
    const { category, availability } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (availability !== undefined) filter.availability = availability === 'true';

    const equipment = await Equipment.findAll({ where: filter });
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Equipment
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Equipment.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ message: 'Equipment not found' });

    const updatedEquipment = await Equipment.findByPk(id);
    res.status(200).json({ message: 'Equipment updated successfully', updatedEquipment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Equipment.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'Equipment not found' });

    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
