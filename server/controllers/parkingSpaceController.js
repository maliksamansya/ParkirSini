const { ParkingSpaceReview, ParkingSpace, Landlord } = require('./../models')

class ParkingSpaceController {
    static async findAllParkingSpace(req, res, next) {
        console.log("masukkk");

        try {
            const parkingSpaces = await ParkingSpace.findAll()
            res.status(200).json(parkingSpaces)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async findOneParkingSpace(req, res, next) {
        try {
            const id = req.params.id
            const parkingSpace = await ParkingSpace.findByPk(id, {
                include: [
                    { model: ParkingSpaceReview },
                    { model: Landlord, attributes: ["email"] }
                ],
            })
            if (!parkingSpace) {
                const error = new Error("ParkingSpace not found");
                error.name = "Not Found";
                throw error;
            }
            res.status(200).json(parkingSpace)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ParkingSpaceController