const router = require("express").Router();
const landlordController = require("../controllers/landlord");
const facilityController = require("../controllers/facility");
const { authenticationAdmin } = require("../middlewares/authentication");

router.post("/register", landlordController.register);
router.post("/login", landlordController.login);

router.get("/spaces", authenticationAdmin, landlordController.fetchParkingSpacesByLandlord)
router.get("/facility", facilityController.getFacilities)
router.post("/facility", facilityController.createFacility)
router.patch("/facility/:id", facilityController.updateFacility)
router.delete("/facility/:id", facilityController.deleteFacility)

module.exports = router;