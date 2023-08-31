const request = require("supertest");
const app = require("../app");
const { sequelize, ParkingSpace } = require("../models");
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
    .post('/admin/login')
    .send({
      email: 'landlord1@example.com',
      password: 'password1',
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

describe("Parking Spaces API", () => {
  describe("GET /pub/spaces - fetchAllParkingSpaces", () => {
    test("should fetch all parking spaces", async () => {
      const response = await request(app).get("/pub/spaces");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });

    test("should fetch all parking spaces", async () => {
      // Mocking an error by making the findAll() method throw an exception
      jest.spyOn(ParkingSpace, 'findAll').mockImplementation(() => {
        throw new Error('Failed to fetch parking spaces');
      });

      const response = await request(app).get("/pub/spaces");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Internal server error");

      // Restore the original implementation of the findAll() method
      jest.spyOn(ParkingSpace, 'findAll').mockRestore();
    });

  });

  describe("GET /pub/spaces/:id - fetchParkingSpaceWithRelations", () => {
    test("should fetch a parking space with related data", async () => {
      const response = await request(app).get(`/pub/spaces/1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("Landlord");
      expect(response.body).toHaveProperty("FacilityParkings");
      expect(response.body).toHaveProperty("Bookings");
      expect(response.body).toHaveProperty("ParkingSpaceReviews");
    });


    test("should handle errors and call the error handler", async () => {
      const response = await request(app).get("/pub/spaces/123");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Data not found!!");
    });
  });

  describe("GET /owner/spaces- fetchParkingSpacesByLandlord", () => {
    test("should fetch parking spaces based on landlord", async () => {
      const response = await request(app).get(`/owner/spaces`).set({
        access_token,
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body[0]).toHaveProperty("Landlord");
      expect(response.body[0]).toHaveProperty("Bookings");
      expect(response.body[0]).toHaveProperty("ParkingSpaceReviews");
      expect(response.body[0]).toHaveProperty("FacilityParkings");
      expect(response.body[0]).toHaveProperty("landlordId", 1);
    });


    test("should handle errors and call the error handler", async () => {
      const response = await request(app).get("/owner/spaces");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Unauthenticated");
    });

  });

  describe("GET /parkingSpace - fetchAllParkingSpaces", () => {
    test("should fetch all parking spaces", async () => {
      const response = await request(app).get("/parkingSpace");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });

    test("should fetch all parking spaces", async () => {
      // Mocking an error by making the findAll() method throw an exception
      jest.spyOn(ParkingSpace, 'findAll').mockImplementation(() => {
        throw new Error('Failed to fetch parking spaces');
      });

      const response = await request(app).get("/parkingSpace");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Internal server error");

      // Restore the original implementation of the findAll() method
      jest.spyOn(ParkingSpace, 'findAll').mockRestore();
    });

  });

  describe("GET /parkingSpace/:id - fetchParkingSpaceWithRelations", () => {
    test("should fetch a parking space with related data", async () => {
      const response = await request(app).get(`/parkingSpace/1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("ParkingSpaceReviews");
    });


    test("should handle errors and call the error handler", async () => {
      const response = await request(app).get("/parkingSpace/123");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Data not found!!");
    });
  });

  describe("GET /admin/parking-space - fetchAllParkingSpaces", () => {
    test("should fetch all parking spaces", async () => {
      const response = await request(app).get("/admin/parking-space").set({
        access_token,
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });

    test("should fetch all parking spaces", async () => {
      // Mocking an error by making the findAll() method throw an exception
      jest.spyOn(ParkingSpace, 'findAll').mockImplementation(() => {
        throw new Error('Failed to fetch parking spaces');
      });

      const response = await request(app).get("/pub/spaces");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Internal server error");

      // Restore the original implementation of the findAll() method
      jest.spyOn(ParkingSpace, 'findAll').mockRestore();
    });

  });

  describe("GET /admin/parking-space/:id - fetchParkingSpaces", () => {
    test("should fetch a parking space with related data", async () => {
      const response = await request(app).get(`/admin/parking-space/1`).set({
        access_token,
      });;

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("ParkingSpaceImages");
    });


    test("should handle errors and call the error handler", async () => {
      const response = await request(app).get("/admin/parking-space/123").set({
        access_token,
      });;;

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Data not found!!");
    });
  });

  describe("POST /admin/parking-space - createParkingSpace", () => {
    test("should create a new parking space", async () => {
      const response = await request(app)
        .post("/admin/parking-space")
        .set({ access_token })
        .send({
          stock: 10,
          name: "Parking Space 1",
          subtitle: "Subtitle",
          description: "Description",
          city: "City",
          price: 10.0,
          mainImg: "image.jpg",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Create parking space success");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("landlordId");
      expect(response.body.data).toHaveProperty("stock", 10);
      expect(response.body.data).toHaveProperty("name", "Parking Space 1");
      expect(response.body.data).toHaveProperty("subtitle", "Subtitle");
      expect(response.body.data).toHaveProperty("description", "Description");
      expect(response.body.data).toHaveProperty("city", "City");
      expect(response.body.data).toHaveProperty("price", 10.0);
      expect(response.body.data).toHaveProperty("mainImg", "image.jpg");
    });

    test("should handle errors and call the error handler", async () => {
      const response = await request(app)
        .post("/admin/parking-space")
        .set({ access_token })
        .send({
          stock: 10,
          name: "Parking Space 1",
          subtitle: "Subtitle",
          description: "Description",
          // Missing required fields
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "City is required");
    });

    test("should handle unauthorized access", async () => {
      const response = await request(app)
        .post("/admin/parking-space")
        // Missing access_token
        .send({
          stock: 10,
          name: "Parking Space 1",
          subtitle: "Subtitle",
          description: "Description",
          city: "City",
          price: 10.0,
          mainImg: "image.jpg",
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthenticated");
    });
  });

  describe("PUT /admin/parking-space/:id - editParkingSpace", () => {
    test("should edit an existing parking space", async () => {
      const parkingSpaceId = 1
      const response = await request(app)
        .put(`/admin/parking-space/${parkingSpaceId}`)
        .set({ access_token })
        .send({
          stock: 20,
          name: "Updated Parking Space",
          subtitle: "Updated Subtitle",
          description: "Updated Description",
          city: "Updated City",
          price: 15.0,
          mainImg: "updated_image.jpg",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Update parking space success");

      const updatedSpaceResponse = await request(app)
        .get(`/admin/parking-space/${parkingSpaceId}`).set({ access_token });

      expect(updatedSpaceResponse.status).toBe(200);
      expect(updatedSpaceResponse.body).toHaveProperty("id", parkingSpaceId);
      expect(updatedSpaceResponse.body).toHaveProperty("stock", 20);
      expect(updatedSpaceResponse.body).toHaveProperty("name", "Updated Parking Space");
      expect(updatedSpaceResponse.body).toHaveProperty("subtitle", "Updated Subtitle");
      expect(updatedSpaceResponse.body).toHaveProperty("description", "Updated Description");
      expect(updatedSpaceResponse.body).toHaveProperty("city", "Updated City");
      expect(updatedSpaceResponse.body).toHaveProperty("price", 15.0);
      expect(updatedSpaceResponse.body).toHaveProperty("mainImg", "updated_image.jpg");
    });

    test("should handle errors and call the error handler", async () => {
      const parkingSpaceId = 123;
      const response = await request(app)
        .put(`/admin/parking-space/${parkingSpaceId}`)
        .set({ access_token })
        .send({
          stock: 20,
          name: "Updated Parking Space",
          subtitle: "Updated Subtitle",
          description: "Updated Description",
          city: "Updated City",
          price: 15.0,
          mainImg: "updated_image.jpg",
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Data not found!!");
    });

    test("should handle unauthorized access", async () => {
      const parkingSpaceId = 1;
      const response = await request(app)
        .put(`/admin/parking-space/${parkingSpaceId}`)
        // Missing access_token
        .send({
          stock: 20,
          name: "Updated Parking Space",
          subtitle: "Updated Subtitle",
          description: "Updated Description",
          city: "Updated City",
          price: 15.0,
          mainImg: "updated_image.jpg",
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthenticated");
    });
  });

  describe("DELETE /admin/parking-space/:id - deleteParkingSpace", () => {
    test("should delete an existing parking space", async () => {
      const parkingSpaceId = 3;
      const response = await request(app)
        .delete(`/admin/parking-space/${parkingSpaceId}`)
        .set({ access_token });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Parking Space Deleted");

      const deletedSpaceResponse = await request(app)
        .get(`/admin/parking-space/${parkingSpaceId}`)
        .set({ access_token });

      expect(deletedSpaceResponse.status).toBe(404);
      expect(deletedSpaceResponse.body).toHaveProperty("message", "Data not found!!");
    });

    test("should handle errors and call the error handler", async () => {
      const parkingSpaceId = 123;
      const response = await request(app)
        .delete(`/admin/parking-space/${parkingSpaceId}`)
        .set({ access_token });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Data not found!!");
    });

    test("should handle unauthorized access", async () => {
      const parkingSpaceId = 1;
      const response = await request(app)
        .delete(`/admin/parking-space/${parkingSpaceId}`)
        // Missing access_token
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthenticated");
    });
  });

});