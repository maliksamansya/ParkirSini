const { Facility } = require("../models");

class facilityController {
  static async createFacility(req, res, next) {
    try {
      const { name } = req.body;
      const facility = await Facility.create({ name });
      res.status(201).json(facility);
    } catch (error) {
      next(error);
    }
  }

  static async getFacilities(req, res, next) {
    try {
      const facilities = await Facility.findAll();
      res.status(200).json(facilities);
    } catch (error) {
      next(error);
    }
  }

  static async updateFacility(req, res, next) {
    try {
      const facilityId = req.params.id;
      const { name } = req.body;
      const facility = await Facility.findByPk(facilityId);
      console.log(facility);
      if (!facility) {
        const error = new Error("Facility not found");
        error.name = "Not Found";
        throw error;
      }
      facility.name = name;
      await facility.save();
      res.status(200).json(facility);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFacility(req, res, next) {
    try {
      const facilityId = req.params.id;
      const facility = await Facility.findByPk(facilityId);
      if (!facility) {
        const error = new Error("Facility not found");
        error.name = "Not Found";
        throw error;
      }
      const deletedFacility = { ...facility.toJSON() };
      await facility.destroy();
      res.status(200).json({
        message: "Facility deleted successfully",
        facility: deletedFacility,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = facilityController;