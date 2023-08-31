const router = require("express").Router();
const customerController = require("../controllers/customer");

router.post("/register", customerController.register);
router.post("/login", customerController.login);
// router.post("/google-sign-in", customerController.googleSignIn);
router.get("/spaces", customerController.fetchAllParkingSpaces);
router.get("/spaces/:id", customerController.fetchParkingSpaceWithRelations);
router.get("/customers", customerController.getAllCustomer)

module.exports = router;
