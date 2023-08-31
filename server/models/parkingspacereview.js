'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingSpaceReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingSpaceReview.belongsTo(models.ParkingSpace, { foreignKey: 'parkingSpaceId' });
      ParkingSpaceReview.belongsTo(models.Customer, { foreignKey: 'customerId' });

    }
  }
  ParkingSpaceReview.init({
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
    review: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Review is required"
        },
        notEmpty: {
          msg: "Review is required"
        }
      }
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Rating is required"
        },
        notEmpty: {
          msg: "Rating is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'ParkingSpaceReview',
  });
  return ParkingSpaceReview;
};