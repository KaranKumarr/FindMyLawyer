const {
    createAvailability,
    deleteAvailability,
    getAvailability,
    updateAvailability,
    getAvailabilityByLawyer
} = require("../controllers/availabilityController");
const { protect } = require("../middleware/authMiddleware");
const router = require('express').Router();

router.route('/').get(protect, getAvailability).post(protect, createAvailability);

router.route('/:availabilityId').put(protect, updateAvailability).delete(protect, deleteAvailability);

router.route('/lawyer/:lawyerId').get(protect, getAvailabilityByLawyer);

module.exports = router;