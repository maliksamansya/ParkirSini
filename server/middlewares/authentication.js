const { Landlord, Customer } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authenticationAdmin(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticated" };
    const payload = verifyToken(access_token);
    const admin = await Landlord.findByPk(payload.id);
    if (!admin) throw { name: "Unauthenticated" };
    req.user = {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

async function authenticationCustomer(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticated" };

    let payload = verifyToken(access_token);

    let customer = await Customer.findByPk(payload.id);
    if (!customer) throw { name: "Unauthenticated" };

    req.user = {
      id: customer.id,
      email: customer.email,
      username: customer.username,
      phoneNumber: customer.phoneNumber,
      address: customer.address
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticationCustomer,
  // authenticationLandlord,
  authenticationAdmin
}

