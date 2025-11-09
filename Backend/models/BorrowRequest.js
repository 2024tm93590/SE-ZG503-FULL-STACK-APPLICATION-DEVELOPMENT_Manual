const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BorrowRequest = sequelize.define('BorrowRequest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
  EquipmentId: { type: DataTypes.INTEGER, allowNull: false },
  Status: { type: DataTypes.ENUM('PENDING','APPROVED','REJECTED','RETURNED'), defaultValue: 'PENDING' },
  FromDate: { type: DataTypes.DATE },
  ToDate: { type: DataTypes.DATE }
}, {
  tableName: 'BorrowRequests',
  timestamps: false
});

module.exports = BorrowRequest;
