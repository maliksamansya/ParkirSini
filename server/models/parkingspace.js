"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkingSpace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingSpace.belongsTo(models.Landlord, { foreignKey: "landlordId" });
      ParkingSpace.hasMany(models.FacilityParking, {
        foreignKey: "parkingSpaceId",
      });
      ParkingSpace.hasMany(models.ParkingSpaceImage, {
        foreignKey: "parkingSpaceId",
      });
      ParkingSpace.hasMany(models.Booking, { foreignKey: "parkingSpaceId" });
      ParkingSpace.hasMany(models.ParkingSpaceReview, {
        foreignKey: "parkingSpaceId",
      });
    }
  }

  ParkingSpace.init(
    {
      landlordId: DataTypes.INTEGER,
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Stock is required",
          },
          notEmpty: {
            msg: "Stock is required",
          },
        },
      },
      mapLong: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Longitude is required",
          },
          notEmpty: {
            msg: "Longitude is required",
          },
        },
      },
      mapLat: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Latitude is required",
          },
          notEmpty: {
            msg: "Latitude is required",
          },
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      subtitle: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Subtitle is required",
          },
          notEmpty: {
            msg: "Subtitle is required",
          },
        },
      },
      description: DataTypes.STRING,
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "City is required",
          },
          notEmpty: {
            msg: "City is required",
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "price is required"
          },
          notEmpty: {
            msg: "price is required"
          },
        }
      },
      mainImg: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "mainImg is required"
          },
          notEmpty: {
            msg: "mainImg is required"
          },
        }
      }
    }, {
    sequelize,
    modelName: 'ParkingSpace',
  });

  return ParkingSpace;
};
