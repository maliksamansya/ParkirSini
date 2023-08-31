'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityParking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FacilityParking.belongsTo(models.Facility, { foreignKey: 'facilityId' });
      FacilityParking.belongsTo(models.ParkingSpace, { foreignKey: 'parkingSpaceId' });
    }
  }
  FacilityParking.init({
    facilityId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Facility is required"
        },
        notEmpty: {
          msg: "Facility is required"
        },
      }
    },
    parkingSpaceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Parking Space is required"
        },
        notEmpty: {
          msg: "Parking Space is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'FacilityParking',
  });
  return FacilityParking;
};