const Availability = require('../models/availabilityModel');
const asyncHandler = require("express-async-handler");

// @desc get availability
// @route GET /api/availability
// @access private
const getAvailability = asyncHandler(async (req, res) => {
    const availabilities = await Availability.findOne({ lawyer: req.lawyer.id }).select('-lawyer -__v');

    res.status(200).json({ availabilities });
});

// @desc get availability
// @route GET /api/availability/lawyer/:lawyerId
// @access private
const getAvailabilityByLawyer = asyncHandler(async (req, res) => {
    const availabilities = await Availability.findOne({ lawyer: req.params.lawyerId }).select('-lawyer -__v');

    res.status(200).json({ availabilities });
});

//@desc create availability
//route POST /api/availability
//@access private
const createAvailability = asyncHandler(async (req, res) => {

    const availabilityExists = await Availability.findOne({ lawyer: req.lawyer.id }).select('-_id');

    if (availabilityExists) {
        res.status(400);
        throw new Error('Availability already exists');
    } else {
        const availability = await Availability.create({
            lawyer: req.lawyer.id,
            schedule_days_runs: req.body.schedule_days_runs,
            schedule_start_hours: req.body.schedule_start_hours,
            schedule_end_hours: req.body.schedule_end_hours
        });

        res.status(201).json(availability);
    }
});


//@desc update availability
//@route PUT /api/availabilities/:id
//@access private
const updateAvailability = asyncHandler(async (req, res) => {

    const availability = await Availability.findByIdAndUpdate(req.params.availabilityId, {
        schedule_days_runs: req.body.schedule_days_runs,
        schedule_start_hours: req.body.schedule_start_hours,
        schedule_end_hours: req.body.schedule_end_hours
    }, { new: true });

    if (availability) {
        res.status(200).json(availability);
    } else {
        res.status(404);
        throw new Error('Availability not found');
    }

});

//@desc delete availability
//@route DELETE /api/availability/:id
//@access private
const deleteAvailability = asyncHandler(async (req, res) => {
    const availability = await Availability.findByIdAndDelete(req.params.availabilityId);

    if (availability) {
        res.status(200).json(req.params.availabilityId);
    } else {
        res.status(404);
        throw new Error('Availability not found');
    }
});

module.exports = {
    getAvailability,
    createAvailability,
    updateAvailability,
    deleteAvailability,
    getAvailabilityByLawyer
};
