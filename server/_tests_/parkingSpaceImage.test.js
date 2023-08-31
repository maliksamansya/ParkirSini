const request = require("supertest");
const app = require("../app");
const { sequelize, ParkingSpaceImage } = require("../models");
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
        sequelize.queryInterface.bulkInsert(
            "ParkingSpaceImages",
            data.parkingSpaceImages.map((image) => {
                delete image.id;
                image.createdAt = image.updatedAt = new Date();
                return image;
            })
        ),
    ]);
    const response = await request(app)
        .post('/admin/login')
        .send({
            email: 'landlord1@example.com',
            password: 'password1',
        });
    access_token = response.body.access_token;
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("ParkingSpaceImages", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
    });

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

describe("Parking Spaces Images", () => {
    describe("GET /admin/parking-space-image - fetchAllParkingSpaceImages", () => {
        test("should fetch all parking spaces images", async () => {
            const response = await request(app).get("/admin/parking-space-image").set({
                access_token,
            });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });

        test("should handle errors and call the error handler", async () => {
            jest.spyOn(ParkingSpaceImage, 'findAll').mockImplementation(() => {
                throw new Error('Failed to fetch parking spaces');
            });

            const response = await request(app).get("/admin/parking-space-image").set({
                access_token,
            });;

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Internal server error");

            jest.spyOn(ParkingSpaceImage, 'findAll').mockRestore();
        });
    });

    describe("GET /admin/parking-space-image/:id - fetchParkingSpaceImage by ID", () => {
        test("should fetch a parking space image with related data", async () => {
            const response = await request(app).get(`/admin/parking-space-image/1`).set({
                access_token,
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id", 1);
            expect(response.body).toHaveProperty("parkingSpaceId");
            expect(response.body).toHaveProperty("imgUrl");
        });

        test("should handle errors and call the error handler for no authentication", async () => {
            const response = await request(app).get(`/admin/parking-space-image/1`);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Unauthenticated");
        });

        test("should handle errors and call the error handler", async () => {
            const response = await request(app).get(`/admin/parking-space-image/123`).set({
                access_token,
            });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Data not found!!");
        });
    });

    describe("DELETE /admin/parking-space-image/:id - deleteParkingSpaceImage", () => {
        test("should delete parking space image based on id", async () => {
            const response = await request(app).delete(`/admin/parking-space-image/1`).set({
                access_token,
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Parking space image deleted");
        });

        test("should handle errors and call the error handler for no authentication", async () => {
            const response = await request(app).get(`/admin/parking-space-image/2`);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Unauthenticated");
        });

        test("should handle errors and call the error handler", async () => {
            const response = await request(app).delete("/admin/parking-space-image/123").set({
                access_token,
            });;

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Data not found!!");
        });

        test("should handle errors and call the error handler", async () => {
            jest.spyOn(ParkingSpaceImage, 'destroy').mockImplementation(() => {
                throw new Error('Failed to delete parking space image');
            });

            const response = await request(app).delete("/admin/parking-space-image/2").set({
                access_token,
            });;

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Internal server error");

            jest.spyOn(ParkingSpaceImage, 'destroy').mockRestore();
        });
    });
});