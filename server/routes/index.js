const router = require("express").Router();
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
const errorHandler = require("../middlewares/errorHandler");
const parkingSpaceRouter = require("./parkingSpaceRouter");

// <<<<<<< malik-1
// const customerRouter = require("./customer")
// const landlordRouter = require("./landlord")
// const parkingSpaceRouter = require('./parkingSpaceRouter');

// router
//    .get("/", Controller.home)
//    .post("/image", upload.array('image'), ControllerImage.upload)
//    .use("/pub", customerRouter)
//    .use("/owner", landlordRouter)
//    .use(errorHandler);
// router.get("/", Controller.home);
// router.use('/review', reviewRouter)
// router.use("/pub", customerRouter)
// router.use("/owner", landlordRouter)
// router.use(parkingSpaceRouter)

// router.use(errorHandler);
// =======

const adminRouter = require("./adminRouter");
const reviewRouter = require("./reviewRouter");
const customerRouter = require("./customer");
const landlordRouter = require("./landlord");
const bookingRouter = require("./createBooking");

router
  .use(parkingSpaceRouter)
  .use("/review", reviewRouter)
  .use("/pub", customerRouter)
  .use("/owner", landlordRouter)
  .use("/admin", adminRouter)
  .use("/booking", bookingRouter)
  .use(errorHandler);

module.exports = router;
