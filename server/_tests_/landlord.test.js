const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Landlord } = require("../models");

beforeAll(async () => {
    await Landlord.destroy({ truncate: true, cascade: true });
});

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Landlords", null, {
        cascade: true,
        restartIdentity: true,
        truncate: true,
      });
});

describe("landlordController", () => {
    describe("POST /owner/register - register", () => {
        test("should register a new customer", async () => {
            const response = await request(app)
                .post("/owner/register")
                .send({
                    username: "JohnDoe",
                    email: "johndoe@example.com",
                    password: "password",
                    role: "Landlord",
                    phoneNumber: "123456789",
                    address: "123 Main St",
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("email", "johndoe@example.com");
        });

        test("should handle errors and call the error handler", async () => {
            const response = await request(app)
                .post("/owner/register")
                .send({
                    username: "JohnDoe",
                    email: "johndoe@example.com",
                    password: "password",
                    // Omitting the phoneNumber and address intentionally to trigger an error
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Phone Number is required");
        });

        test("should handle empty input data and call the error handler", async () => {
            const response = await request(app)
                .post("/owner/register")
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Email is required");
        });
    });

    describe("POST /owner/login - login", () => {
        test("should login a customer with valid credentials", async () => {
            const response = await request(app)
                .post("/owner/login")
                .send({
                    email: "johndoe@example.com",
                    password: "password",
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("access_token");
        });

        test("should handle errors and call the error handler", async () => {
            const response = await request(app)
                .post("/owner/login")
                .send({
                    email: "johndoe@example.com",
                    password: "wrongpassword",
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Invalid email/password");
        });

        test("should handle errors and call the error handler (email not found)", async () => {
            const response = await request(app)
                .post("/owner/login")
                .send({
                    email: "nonexistent@example.com",
                    password: "password",
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Invalid email/password");
        });

        test("should handle empty input data and call the error handler", async () => {
            const response = await request(app)
                .post("/owner/login")
                .send({
                    email: "johndoe@example.com",
                    password: ""
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Email or Password is required");
        });

        test("should handle empty input data and call the error handler", async () => {
            const response = await request(app)
                .post("/owner/login")
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Email or Password is required");
        });
    });
});