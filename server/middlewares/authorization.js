const { ParkingSpace } = require("../models");

async function authorization(req, res, next) {
  try {
    let userId = req.user.id;
    let parkingSpace = await ParkingSpace.findByPk(req.params.id);
    if (!parkingSpace) throw { name: "DataNotFound" };
    if (userId !== parkingSpace.landlordId) throw { name: "Forbidden" };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
