const router = require("express").Router()
const Controller = require("../controllers/createBooking")
const { authenticationCustomer } = require("../middlewares/authentication")
const { Booking, Landlord, Customer, ParkingSpace, ParkingSpaceReview } = require("../models");
const { Op } = require('sequelize');

async function authorizationCustomer(req, res, next) {
   try {
      const foundBooking = await Booking.findAll({
         where: {
            [Op.and]: [
               { customerId: req.user.id },
               { parkingSpaceId: req.body.parkingSpaceId }
            ]
         },
         attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      // console.log(req.body, "<<<<<< BODYYYYY")
      if (foundBooking.length > 0 && foundBooking[0].paid) throw { name: "Forbidden" }
      next();
   } catch (error) {
      console.log(error);
      next(error);
   }
}

router
   .post("/generate-midtrans", authenticationCustomer, authorizationCustomer, Controller.generateMidtransToken)
   .post("/create-booking", authenticationCustomer, Controller.createBookingAmount)
   .get("/bookingByCustomerId", authenticationCustomer, Controller.getAllBookings)

module.exports = router