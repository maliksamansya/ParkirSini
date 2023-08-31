const ReviewController = require("../controllers/reviewController");
const { authenticationCustomer } = require("../middlewares/authentication");
const router = require('express').Router()

router.get('/', ReviewController.getAllReview)
router.get('/:id', ReviewController.getReviewbyParkingSpaceId)
router.post('/:parkingSpaceId', authenticationCustomer, ReviewController.createReview)
// router.patch('/:id', ReviewController.editReview)
// router.delete('/:id', ReviewController.deleteReview)

module.exports = router


