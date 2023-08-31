const router = require("express").Router();
const Auth = require("../controllers/admin-auth");
const Admin = require("../controllers/admin");
const { authenticationAdmin } = require("../middlewares/authentication");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });

router.post("/login", Auth.login);
router.post("/register", Auth.register);

router.use(authenticationAdmin);

router.get("/landlord-data", Admin.fetchLandlordData);

router.get("/parking-space", Admin.fetchParkingSpace);
router.get("/parking-space/:id", Admin.fetchParkingSpaceDetail);
router.post("/parking-space", Admin.createParkingSpace);
router.post(
  "/parking-space-transaction",
  upload.array("images"),
  Admin.createParkingSpaceTransaction
);
router.put("/parking-space/:id", Admin.editParkingSpace);
router.delete("/parking-space/:id", Admin.deleteParkingSpace);

router.get("/parking-space-image", Admin.fetchParkingSpaceImages);
router.get("/parking-space-image/:id", Admin.fetchOneParkingSpaceImage);
router.post(
  "/parking-space-image/:id",
  upload.single("imgUrl"),
  Admin.uploadParkingSpaceImage
);
router.delete("/parking-space-image/:id", Admin.deleteParkingSpaceImage);

module.exports = router;
