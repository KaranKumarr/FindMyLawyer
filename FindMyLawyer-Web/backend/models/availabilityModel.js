const mongoose = require('mongoose');

availabilitiesSchema = new mongoose.Schema({
    lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lawyer',
        unique: true,
        required: [true, 'Lawyer is required']
    },
    schedule_days_runs: {
        type: [String],
        required: [true, 'Schedule days are required'],
        default: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    },
    schedule_start_hours: {
        type: [String],
        required: [true, 'Schedule start hours are required'],
        default: ['09:00', '09:00', '09:00', '09:00', '09:00', '', '']
    },
    schedule_end_hours: {
        type: [String],
        required: [true, 'Schedule end hours are required'],
        default: ['18:00', '18:00', '18:00', '18:00', '18:00', '', '']
    }
});

module.exports = mongoose.model('Availabilities', availabilitiesSchema);