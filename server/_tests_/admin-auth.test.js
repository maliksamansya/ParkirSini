const request = require("supertest");
const { Landlord, sequelize } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await Landlord.destroy({ truncate: true, cascade: true });
  await Landlord.findOrCreate({
    where: { email: "admin1@example.com" },
    defaults: {
      username: "Admin 2",
      password: "admin1234",
      role: "Admin",
      phoneNumber: "0812345678",
      address: "Example Street",
    },
  });
});

afterAll(async () => {
  await Landlord.destroy({
    cascade: true,
    restartIdentity: true,
    truncate: true,
  });
  await sequelize.queryInterface.bulkDelete("Landlords", null, {
    cascade: true,
    restartIdentity: true,
    truncate: true,
  });
  // await sequelize.query('ALTER SEQUENCE "Landlords_id_seq" RESTART WITH 1;');
});

describe("admin-auth", () => {
  describe("POST /admin/register - register", () => {
    test("should register a new admin", async () => {
      const response = await request(app).post("/admin/register").send({
        username: "Admin 2",
        email: "admin2@example.com",
        password: "admin1234",
        phoneNumber: "0812345678",
        address: "Example Street",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Create user admin admin2@example.com success"
      );
    });

    test("should return error for empty email", async () => {
      const response = await request(app).post("/admin/register").send({
        username: "Admin 2",
        password: "admin1234",
        phoneNumber: "0812345678",
        address: "Example Street",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("should return error for empty password", async () => {
      const response = await request(app).post("/admin/register").send({
        username: "Admin 2",
        email: "admin2@example.com",
        phoneNumber: "0812345678",
        address: "Example Street",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password is required");
    });

    test("should return error for duplicate email", async () => {
      const response = await request(app).post("/admin/register").send({
        username: "Admin 1",
        email: "admin1@example.com",
        password: "admin1234",
        phoneNumber: "0812345678",
        address: "Example Street",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email must be unique");
    });
  });

  describe("POST /admin/login - login", () => {
    test("should return access_token", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin1@example.com",
        password: "admin1234",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
      expect(response.body).toHaveProperty("amount", expect.any(Number));
    });

    test("should return error for empty email", async () => {
      const response = await request(app).post("/admin/login").send({
        password: "admin1234",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Email or Password is required"
      );
    });

    test("should return error for empty password", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin1@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Email or Password is required"
      );
    });

    test("should return error for wrong email", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin_other@example.com",
        password: "admin1234",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });

    test("should return error for wrong password", async () => {
      const response = await request(app).post("/admin/login").send({
        email: "admin1@example.com",
        password: "admin12345",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });
  });
});
