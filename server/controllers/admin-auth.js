const { Landlord } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

async function processLogin(email, password) {
  const findUser = await Landlord.findOne({
    where: {
      email,
    },
  });
  if (!findUser) throw { message: "Invalid email/password" };
  const checkPassword = compareHash(password, findUser.password);
  if (!checkPassword) throw { message: "Invalid email/password" };
  const access_token = createToken({
    id: findUser.id,
    email: findUser.email,
    role: findUser.role,
  });

  return access_token;
}

class Auth {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { message: "Email is required" };
      if (!password) throw { message: "Password is required" };
      const access_token = await processLogin(email, password);
      const userData = await Landlord.findOne({ where: { email } });
      res.json({ access_token, amount: userData.amount });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, username, phoneNumber, address } = req.body;
      const createUser = await Landlord.create({
        email,
        password,
        username,
        role: "Admin",
        phoneNumber,
        address,
        amount: 0,
      });

      res.status(201).json({
        message: `Create user admin ${createUser.email} success`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Auth;
