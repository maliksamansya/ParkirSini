'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingSpaceImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingSpaceImage.belongsTo(models.ParkingSpace, { foreignKey: 'parkingSpaceId' });
    }
  }
  ParkingSpaceImage.init({
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
    imgUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Image is required"
        },
        notEmpty: {
          msg: "Image is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'ParkingSpaceImage',
  });
  return ParkingSpaceImage;
};