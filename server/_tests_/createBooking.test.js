const request = require("supertest");
const app = require("../app");
const { sequelize, Booking, Customer } = require("../models");
const CreateBooking = require("../controllers/createBooking.js");
const { createToken, verifyToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const data = require("../db.json");
const { generateHTML, generateHTMLReminder } = require("../helpers/emailHtmlContent")
let token;

beforeAll(async () => {
   // Clean up the Customers table before running the tests
   let customerData = {
      username: 'user',
      email: 'user@gmail.com',
      password: hashPassword('12345'),
      phoneNumber: '08982347236',
      address: 'Jl. RE Martadinata'
   }
   let customer = await Customer.create(customerData)
   token = createToken({ id: customer.id })

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
      )
   ]);
});

beforeEach(() => {
   jest.restoreAllMocks();
});

afterAll(async () => {
   // Clean up the Customers table after running the tests
   await sequelize.queryInterface.bulkDelete("Bookings", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true
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

describe("createBooking", () => {
   describe("POST /booking/generate-midtrans", () => {
      test("should return a midtrans token", async () => {

         const response = await request(app)
            .post("/booking/generate-midtrans")
            .send({
               amount: "20000",
               parkingSpaceId: 1
            })
            .set("access_token", token)

         expect(response.status).toBe(201);
         expect(response.body).toHaveProperty("token", expect.any(String));
         expect(response.body).toHaveProperty("redirect_url", expect.any(String));
      });

      test("should handle empty input data and call the error handler", async () => {
         const response = await request(app)
            .post("/booking/generate-midtrans")
            .send({})
            .set("access_token", token)

         expect(response.status).toBe(500);
         expect(response.body).toHaveProperty("message", "Internal server error");

      });
   });

   describe("POST /booking/create-booking", () => {
      test("should return a message successfully added a new booking", async () => {

         const response = await request(app)
            .post("/booking/create-booking")
            .send({
               amount: "20000",
               email: 'user@gmail.com',
               parkingSpaceId: 1,
               price: 20000
            })
            .set("access_token", token)

         expect(response.status).toBe(201);
         expect(response.body).toHaveProperty("message", expect.any(String));
      });

      test("should handle empty input data and call the error handler", async () => {
         const response = await request(app)
            .post("/booking/create-booking")
            .send({})
            .set("access_token", token)

         expect(response.status).toBe(400);
         expect(response.body).toHaveProperty("message", expect.any(String));

      });
   });

   describe("Generate HTML", () => {
      test("should return a html string", async () => {
         const amount = 20000;
         const email = "test@example.com";
         const date = "2023-07-04";
         const address = "Jl. RE. Martadinata";
         const username = "test"

         const result = generateHTML(amount, email, date, address, username);
         expect(result).toEqual(expect.any(String));
      });

      test("should return a html string", async () => {
         const result = generateHTMLReminder();
         expect(result).toEqual(expect.any(String));
      });
   });
});
