const {
    getAppointments,
    getSingleAppointment,
    createAppointment,
    deleteAppointment,
    updateAppointment
} = require("../controllers/appointmentsController");
const { protect } = require("../middleware/authMiddleware");
const router = require('express').Router();

router.route('/').get(protect, getAppointments).post(protect, createAppointment);

router.route('/:appointmentId').get(protect, getSingleAppointment).put(protect, updateAppointment).delete(protect, deleteAppointment);


module.exports = router;