const request = require("supertest");
const app = require("../app");
const { sequelize, ParkingSpace, Booking } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const data = require("../db.json");
let access_token

beforeAll(async () => {
    await Promise.allSettled([
        sequelize.queryInterface.bulkInsert(
            "Landlords",
            data.landlords.map((el) => {
                delete el.id;
                el.password = hashPassword(el.password);
                el.createdAt = el.updatedAt = new Date();
                return el;
            })
        ),
        sequelize.queryInterface.bulkInsert(
            "Customers",
            data.customers.map((customer) => {
                delete customer.id;
                customer.password = hashPassword(customer.password);
                customer.createdAt = customer.updatedAt = new Date();
                return customer;
            })
        ),
        sequelize.queryInterface.bulkInsert(
            "ParkingSpaces",
            data.parkingSpaces.map((parkingSpace) => {
                delete parkingSpace.id;
                parkingSpace.createdAt = parkingSpace.updatedAt = new Date();
                return parkingSpace;
            })
        ),
        sequelize.queryInterface.bulkInsert(
            "Facilities",
            data.facilities.map((facility) => {
                delete facility.id;
                facility.createdAt = facility.updatedAt = new Date();
                return facility;
            })
        ),
        sequelize.queryInterface.bulkInsert(
            "FacilityParkings",
            data.facilityParking.map((facilityParking) => {
                delete facilityParking.id;
                facilityParking.createdAt = facilityParking.updatedAt = new Date();
                return facilityParking;
            })
        ),
        sequelize.queryInterface.bulkInsert(
            "Bookings",
            data.bookings.map((booking) => {
                delete booking.id;
                booking.createdAt = booking.updatedAt = new Date();
                return booking;
            })
        ),
        sequelize.queryInterface.bulkInsert(
            "ParkingSpaceReviews",
            data.parkingSpaceReviews.map((review) => {
                delete review.id;
                review.createdAt = review.updatedAt = new Date();
                return review;
            })
        ),

    ]);
    const response = await request(app)
        .post('/pub/login')
        .send({
            email: 'customer1@example.com',
            password: 'password3',
        });
    access_token = response.body.access_token;
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("ParkingSpaceReviews", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete("Bookings", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete("FacilityParkings", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete("Facilities", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete("ParkingSpaces", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete("Customers", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete("Landlords", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });
});

describe("Booking", () => {
    describe("GET /booking/bookingByCustomerId - getAllBookings", () => {
        test("should fetch all bookings from customer", async () => {
            const response = await request(app).get("/booking/bookingByCustomerId").set({
                access_token,
            });;
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("bookings");
            expect(response.body.bookings).toEqual(expect.any(Array));
        });

        test("should fetch all bookings from customer", async () => {
            // Mocking an error by making the findAll() method throw an exception
            jest.spyOn(Booking, 'findAll').mockImplementation(() => {
                throw new Error('Failed to fetch booking');
            });

            const response = await request(app).get("/booking/bookingByCustomerId").set({
                access_token,
            });;

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Internal server error");

            // Restore the original implementation of the findAll() method
            jest.spyOn(ParkingSpace, 'findAll').mockRestore();
        });
    });
})