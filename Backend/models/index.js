const User = require('./User');
const Equipment = require('./Equipment');
const BorrowRequest = require('./BorrowRequest');

// Associations
User.hasMany(BorrowRequest, { foreignKey: 'UserId' });
BorrowRequest.belongsTo(User, { foreignKey: 'UserId' });

Equipment.hasMany(BorrowRequest, { foreignKey: 'EquipmentId' });
BorrowRequest.belongsTo(Equipment, { foreignKey: 'EquipmentId' });

module.exports = { User, Equipment, BorrowRequest };
