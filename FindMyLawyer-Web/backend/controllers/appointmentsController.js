const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const Lawyer = require("../models/lawyerModel");
const Client = require('../models/clientModel');

// @desc Get Appointments for LAWYERS
// @route GET /api/appointments
// @access private
const getAppointments = asyncHandler(async (req, res) => {

    if (req.lawyer) {
        const appointments = await Appointment.find({ lawyer: req.lawyer.id }).sort({ "appointmentDate": -1, "appointmentTiming": 1 });
        res.status(200).json(appointments);
    } else if (req.client) {
        const appointments = await Appointment.find({ client: req.client.id }).sort({ "appointmentDate": -1, "appointmentTiming": 1 });
        res.status(200).json(appointments);
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});

// @desc Create Appointments
// @route POST /api/appointments
// @access private
const createAppointment = asyncHandler(async (req, res) => {

    const appointment = await Appointment.create({
        appointmentTiming: req.body.appointmentTiming,
        appointmentDate: req.body.appointmentDate,
        appointmentBrief: req.body.appointmentBrief,
        lawyer: req.body.lawyer,
        client: req.client.id,
        phoneNumber: req.body.phoneNumber,
        clientName: req.body.clientName,
        status: req.body.status,
    });

    if (appointment)
        res.status(201).json(appointment);
    else {
        res.status(400);
        throw new Error("Appointment not created");
    }
});


// @desc Get Single Appointment
// @route GET /api/appointments/:appointmentId
// @access private
const getSingleAppointment = asyncHandler(async (req, res) => {

    const appointment = await Appointment.findById(req.params.appointmentId);

    if (appointment) {
        res.status(200).json(appointment);
    } else {
        res.status(404);
        throw new Error("Appointment not found");
    }

});


// @desc Update Appointment
// @route PUT /api/appointments/:appointmentId
// @access private
const updateAppointment = asyncHandler(async (req, res) => {

    const appointment = await Appointment.findById(req.params.appointmentId);

    if (appointment) {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, { new: true });
        res.status(200).json(updatedAppointment);
    } else {
        res.status(404);
        throw new Error("Appointment not found");
    }
});

// @desc Delete Appointment
// @route DELETE /api/appointments/:appointmentId
// @access private
const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.appointmentId);

    if (appointment) {
        await appointment.remove();
        res.status(200).json({ "appointmentId": req.params.appointmentId });
    } else {
        res.status(404);
        throw new Error("Appointment not found");
    }
});

module.exports = { getAppointments, createAppointment, getSingleAppointment, updateAppointment, deleteAppointment };