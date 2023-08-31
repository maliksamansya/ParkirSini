function errorHandler(error, req, res, next) {
    let code = 500;
    let message = "Internal server error";

    console.log(error)

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      code = 400;
      message = error.errors[0].message
    } else if (
      error.name === "Unauthenticated" ||
      error.name === "JsonWebTokenError"
    ) {
      code = 401;
      message = "Unauthenticated";
    } else if (error.name === "Not Found") {
      code = 404;
      message = "Data not found!!";
    } else if (error.name === "Forbidden") {
      code = 403;
      message = "You are not authorized!!";
    } else if (error.message === "Invalid email/password") {
      code = 401;
      message = "Invalid email/password";
    } else if (
      error.message === "Email is required" ||
      error.message === "Password is required"
    ) {
      code = 400;
      message = "Email or Password is required";
    }

    res.status(code).json({ message });
  }
  module.exports = errorHandler;
