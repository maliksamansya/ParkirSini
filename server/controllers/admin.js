const {
  ParkingSpace,
  ParkingSpaceImage,
  Landlord,
  FacilityParking,
  sequelize,
} = require("../models");
class Admin {
  //PARKING SPACE
  static async fetchParkingSpace(req, res, next) {
    try {
      const data = await ParkingSpace.findAll({
        include: [
          { model: Landlord, attributes: { exclude: ["password"] } },
          { model: ParkingSpaceImage },
        ],
        order: [["id", "ASC"]],
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchParkingSpaceDetail(req, res, next) {
    try {
      const id = req.params.id;
      const data = await ParkingSpace.findOne({
        include: [
          { model: Landlord, attributes: { exclude: ["password"] } },
          { model: ParkingSpaceImage },
        ],
        where: {
          id,
        },
      });
      if (!data) throw { name: "Not Found" };
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createParkingSpace(req, res, next) {
    try {
      const { stock, name, subtitle, description, city, price, mainImg } =
        req.body;
      const landlordId = req.user.id;
      const mapLong = req.body.mapLong || 0;
      const mapLat = req.body.mapLat || 0;

      const newSpace = await ParkingSpace.create({
        landlordId,
        stock,
        mapLong,
        mapLat,
        name,
        subtitle,
        description,
        city,
        price,
        mainImg,
      });
      res
        .status(201)
        .json({ message: "Create parking space success", data: newSpace });
    } catch (error) {
      next(error);
    }
  }

  static async createParkingSpaceTransaction(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const mainImg = req.files[0].path;
      const images = req.files
        .filter((el, index) => {
          return index !== 0;
        })
        .map((el) => {
          return el.path;
        });

      const { stock, name, subtitle, description, city, price, facilities } =
        req.body;
      const landlordId = req.user.id;
      const mapLong = req.body.mapLong || 0;
      const mapLat = req.body.mapLat || 0;
      console.log(stock, name, subtitle, description, city, price, facilities, '<----ini di transaction')
      const newSpace = await ParkingSpace.create(
        {
          landlordId,
          stock,
          mapLong,
          mapLat,
          name,
          subtitle,
          description,
          city,
          price,
          mainImg,
        },
        { transaction }
      );



      const facilityPromises = facilities.map(async (facilityId) => {
        await FacilityParking.create(
          {
            facilityId,
            parkingSpaceId: newSpace.id,
          },
          { transaction }
        );
      });

      await Promise.all(facilityPromises);

      const imagePromises = images.map(async (imgUrl) => {
        await ParkingSpaceImage.create(
          {
            parkingSpaceId: newSpace.id,
            imgUrl,
          },
          { transaction }
        );
      });

      await Promise.all(imagePromises);
      await transaction.commit();

      res
        .status(201)
        .json({ message: "Create parking space success", data: newSpace });
    } catch (error) {
      await transaction.rollback();
      console.log(error.message);
      next(error);
    }
  }

  static async editParkingSpace(req, res, next) {
    try {
      const id = req.params.id;
      const { stock, name, subtitle, description, city, price, mainImg } =
        req.body;
      const mapLong = req.body.mapLong || 0;
      const mapLat = req.body.mapLat || 0;

      const checkData = await ParkingSpace.findOne({ where: { id } });
      if (!checkData) throw { name: "Not Found" };

      await ParkingSpace.update(
        {
          stock,
          mapLong,
          mapLat,
          name,
          subtitle,
          description,
          city,
          price,
          mainImg,
        },
        {
          where: { id },
        }
      );
      res.status(201).json({ message: "Update parking space success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteParkingSpace(req, res, next) {
    try {
      const id = req.params.id;

      const checkData = await ParkingSpace.findOne({ where: { id } });
      if (!checkData) throw { name: "Not Found" };

      await ParkingSpace.destroy({ where: { id } });
      res.status(201).json({ message: "Parking Space Deleted" });
    } catch (error) {
      next(error);
    }
  }

  //PARKING SPACE IMAGE
  static async fetchParkingSpaceImages(req, res, next) {
    try {
      const data = await ParkingSpaceImage.findAll({ order: [["id", "ASC"]] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchOneParkingSpaceImage(req, res, next) {
    try {
      const id = req.params.id;
      const data = await ParkingSpaceImage.findOne({
        where: {
          id,
        },
      });
      if (!data) throw { name: "Not Found" };
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async uploadParkingSpaceImage(req, res, next) {
    try {
      const parkingSpaceId = req.params.id;
      const imgUrl = req.file.path;

      const newImage = await ParkingSpaceImage.create({
        parkingSpaceId,
        imgUrl,
      });
      res.status(201).json({
        message: `Added new image for Parking Space ${parkingSpaceId}`,
        data: newImage,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteParkingSpaceImage(req, res, next) {
    try {
      const id = req.params.id;

      const checkData = await ParkingSpaceImage.findOne({ where: { id } });
      if (!checkData) throw { name: "Not Found" };

      const newImage = await ParkingSpaceImage.destroy({ where: { id } });
      res.status(201).json({ message: "Parking space image deleted" });
    } catch (error) {
      next(error);
    }
  }

  //FETCH LANDLORD DATA
  static async fetchLandlordData(req, res, next) {
    try {
      const id = req.user.id;
      const data = await Landlord.findOne({
        attributes: { exclude: ["password"] },
        where: { id },
        order: [["id", "ASC"]],
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Admin;
