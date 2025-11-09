const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Equipment = sequelize.define('Equipment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  condition: { type: DataTypes.STRING, defaultValue: 'Good' },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  availability: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'Equipment',
  timestamps: false
});

module.exports = Equipment;
