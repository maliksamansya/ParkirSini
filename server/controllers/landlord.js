const { compareHash } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { Landlord, ParkingSpace, Booking, ParkingSpaceReview, FacilityParking } = require("../models");

class landlordController {
    static async register(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body;
            let landlord = await Landlord.create({
                username,
                email,
                password,
                role: "Landlord",
                phoneNumber,
                address
            });
            res.status(201).json({ id: landlord.id, email });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) throw { message: "Email is required" };
            if (!password) throw { message: "Password is required" };

            const landlord = await Landlord.findOne({ where: { email } });

            if (!landlord) throw { message: "Invalid email/password" };
            const valid = compareHash(password, landlord.password);
            if (valid === false) throw { message: "Invalid email/password" };

            const access_token = createToken({ id: landlord.id });

            res.status(200).json({ access_token });
        } catch (error) {
            next(error);
        }
    }

    static async fetchParkingSpacesByLandlord(req, res, next) {
        try {
            const LandlordId = req.user.id;
            console.log(LandlordId);
            const parkingSpace = await ParkingSpace.findAll({
                where: { landlordId: LandlordId },
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
                ],
            });

            res.status(200).json(parkingSpace);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = landlordController