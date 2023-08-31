const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Facility } = require("../models");

beforeAll(async () => {
  await Facility.destroy({ truncate: true, cascade: true });
  const facilityData = [
    { name: "Facility 1" },
    { name: "Facility 2" },
    { name: "Facility 3" },
  ];
  await Facility.bulkCreate(facilityData);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Facilities", null, {
    cascade: true,
    restartIdentity: true,
    truncate: true,
  });
});

describe("facilityController", () => {
  describe("POST /owner/facility - createFacility", () => {
    test("should create a new facility", async () => {
      const response = await request(app)
        .post("/owner/facility")
        .send({ name: "New Facility" });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("name", "New Facility");
    });

    test("should handle errors and call the error handler", async () => {
      const response = await request(app)
        .post("/owner/facility")
        .send({ name: "" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Name is required");
    });
  });

  describe("GET /owner/facility - getFacilities", () => {
    test("should retrieve all facilities", async () => {
      const response = await request(app).get("/owner/facility");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toBe(4);
    });
    
  });

  describe("PATCH /owner/facility/:id - updateFacility", () => {
    test("should update an existing facility", async () => {
      const facility = await Facility.create({ name: "Facility" });
    
      const response = await request(app)
        .patch(`/owner/facility/${facility.id}`)
        .send({ name: "Updated Facility" });
    
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Updated Facility");
    });
    

    test("should handle errors and call the error handler", async () => {
      const response = await request(app)
        .patch("/owner/facility/123")
        .send({ name: "Updated Facility" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Data not found!!");
    });
  });

  describe("DELETE /owner/facility/:id - deleteFacility", () => {
    test("should delete an existing facility", async () => {
      const facility = await Facility.create({ name: "Facility to delete" });

      const response = await request(app).delete(`/owner/facility/${facility.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Facility deleted successfully");
      expect(response.body.facility).toEqual(expect.any(Object));
      expect(response.body.facility.name).toBe("Facility to delete");
    });

    test("should handle errors and call the error handler", async () => {
      const response = await request(app).delete("/owner/facility/123");

      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message", "Data not found!!");
    });
  });
});