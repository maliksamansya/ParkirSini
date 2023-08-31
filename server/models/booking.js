'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.ParkingSpace, { foreignKey: 'parkingSpaceId' });
    }
  }
  Booking.init({
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
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Customer is required"
        },
        notEmpty: {
          msg: "Customer is required"
        },
      }
    },
    paid: DataTypes.BOOLEAN,
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Price is required"
        },
        notEmpty: {
          msg: "Price is required"
        },
      }
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Duration is required"
        },
        notEmpty: {
          msg: "Duration is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};