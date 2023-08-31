const request = require('supertest');
const app = require('../app');
const { sequelize, ParkingSpaceReview, Customer } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const data = require('../db.json');
let access_token;
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
    ]);
    await ParkingSpaceReview.destroy({ truncate: true, cascade: true });
    const response = await request(app)
        .post('/pub/login')
        .send({
            email: 'customer1@example.com',
            password: 'password3',
        });
    access_token = response.body.access_token;
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('ParkingSpaceReviews', null,  {
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

describe('ReviewController', () => {
    describe('GET /reviews/:id - getReviewbyParkingSpaceId', () => {
        test('should fetch reviews for a specific parking space', async () => {
            const parkingSpaceId = 1;
            const response = await request(app).get(`/review/${parkingSpaceId}`);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.any(Array));
        });
    });
    describe('GET /review - getAllReview', () => {
        test('should fetch all reviews', async () => {
            const response = await request(app).get('/review');
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.any(Array));
        });
        test('should handle errors when fetching reviews', async () => {
            // Mocking the error by throwing an exception
            ParkingSpaceReview.findAll = jest.fn(() => {
                throw new Error('Failed to fetch reviews');
            });

            const response = await request(app).get('/review');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                "message": "Internal server error",
            });
        });
    });

    describe('POST /reviews/:parkingSpaceId - createReview', () => {
        test('should create a new review', async () => {
            const parkingSpaceId = 1;
            const reviewData = {
                review: 'Great parking space!',
                rating: 5,
            };
            const response = await request(app)
                .post(`/review/1`)
                .set({
                    access_token,
                })
                .send(reviewData);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ msg: 'Review successfully sent' });
        });

        test('should handle errors when creating a review', async () => {
            // Mocking the error by throwing an exception
            ParkingSpaceReview.create = jest.fn(() => {
                throw new Error('Failed to create review');
            });

            const parkingSpaceId = 1;
            const reviewData = {
                review: 'Great parking space!',
                rating: 5,
            };
            const response = await request(app)
                .post(`/review/${parkingSpaceId}`)
                .set({
                    access_token,
                })
                .send(reviewData);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                "message": "Internal server error",
            });
        });
    });
});
