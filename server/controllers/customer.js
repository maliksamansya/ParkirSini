const { compareHash } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { Customer, ParkingSpace, Facility, Landlord, FacilityParking, Booking, ParkingSpaceReview, ParkingSpaceImage } = require("../models");

class customerController {
    static async register(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body;
            let customer = await Customer.create({
                username,
                email,
                password,
                phoneNumber,
                address
            });
            res.status(201).json({
                id: customer.id,
                email: customer.email,
                username: customer.username,
                phoneNumber: customer.phoneNumber,
                address: customer.address
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { message: "Email is required" };
            if (!password) throw { message: "Password is required" };

            const customer = await Customer.findOne({ where: { email } });

            if (!customer) throw { message: "Invalid email/password" };
            const valid = compareHash(password, customer.password);
            if (valid === false) throw { message: "Invalid email/password" };

            const access_token = createToken({ id: customer.id });

            res.status(200).json({ access_token });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async getAllCustomer(req, res, next) {
        try {
            const customers = await Customer.findAll()
            res.status(200).json(customers)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    // static async googleSignIn(req, res, next) {
    //     try {
    //         const googleToken = req.headers["google-oauth-token"];
    //         const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    //         const ticket = await client.verifyIdToken({
    //             idToken: googleToken,
    //             audience: process.env.GOOGLE_CLIENT_ID,
    //         });
    //         const payload = ticket.getPayload();
    //         let customer = await Customer.findOne({
    //             where: {
    //                 email: payload.email,
    //             },
    //         });
    //         if (!customer) {
    //             customer = await Customer.create(
    //                 {
    //                     username: payload.name,
    //                     email: payload.email,
    //                     password: "password",
    //                 },
    //                 {
    //                     hooks: false,
    //                 }
    //             );
    //         }
    //         const access_token = verifyToken({
    //             id: customer.id,
    //         });
    //         res.status(200).json({
    //             access_token
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // }

    static async fetchAllParkingSpaces(req, res, next) {
        try {
            const parkingSpaces = await ParkingSpace.findAll();
            res.status(200).json(parkingSpaces);
        } catch (error) {
            next(error);
        }
    }

    static async fetchParkingSpaceWithRelations(req, res, next) {
        try {
            const parkingSpaceId = req.params.id;
            const parkingSpace = await ParkingSpace.findOne({
                where: { id: parkingSpaceId },
                include: [
                    {
                        model: Landlord,
                        attributes: { exclude: ['password'] },
                    },
                    {
                        model: FacilityParking,
                    },
                    {
                        model: Booking,
                    },
                    {
                        model: ParkingSpaceReview,
                    },
                    {
                        model: ParkingSpaceImage,
                    },
                ],
            });

            if (!parkingSpace) {
                const error = new Error("ParkingSpace not found");
                error.name = "Not Found";
                throw error;
            }

            res.status(200).json(parkingSpace);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAllCustomer(req, res, next) {
        try {
            const customers = await Customer.findAll()
            res.status(200).json(customers)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = customerController
