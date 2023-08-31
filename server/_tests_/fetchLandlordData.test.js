const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Landlord } = require("../models");

beforeAll(async () => {
  await Landlord.destroy({ truncate: true, cascade: true });
  await Landlord.create({
    email: "admin1@example.com",
    username: "Admin 1",
    password: "admin1234",
    role: "Admin",
    phoneNumber: "0812345678",
    address: "Example Street",
  });

  const response = await request(app).post("/admin/login").send({
    email: "admin1@example.com",
    password: "admin1234",
  });
  access_token = response.body.access_token;
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Landlords", null, {
    cascade: true,
    restartIdentity: true,
    truncate: true,
  });
});

describe("adminController", () => {
  describe("GET /admin/landlord-data - fetchLandlordData", () => {
    test("should getLandlordData", async () => {
      const response = await request(app)
        .get("/admin/landlord-data")
        .set({ access_token });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("role");
      expect(response.body).toHaveProperty("phoneNumber");
      expect(response.body).toHaveProperty("address");
      expect(response.body).toHaveProperty("amount");
    });

    test("should return error if no access token", async () => {
      const response = await request(app).get("/admin/landlord-data");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthenticated");
    });

    test("should return error if access token invalid", async () => {
      access_token = "abcde";
      const response = await request(app)
        .get("/admin/landlord-data")
        .set({ access_token });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthenticated");
    });
  });
});
