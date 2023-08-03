const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    lawyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Lawyer is required'],
        ref: 'Lawyer'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Client is required'],
        ref: 'Client'
    },
    clientName: {
        type: String,
        required: [true, 'Client Name is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Client Phone is required']
    },
    appointmentTiming: {
        type: String,
        required: [true, 'timing is required']
    },
    appointmentDate: {
        type: Date,
        required: [true, 'date is required']
    },
    summary: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);