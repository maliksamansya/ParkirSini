const ParkingSpaceController = require("../controllers/parkingSpaceController");
const router = require('express').Router()

router.get('/parkingSpace', ParkingSpaceController.findAllParkingSpace)
router.get('/parkingSpace/:id', ParkingSpaceController.findOneParkingSpace)


module.exports = router
