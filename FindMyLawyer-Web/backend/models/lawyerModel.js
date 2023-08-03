const mongoose = require('mongoose');

const lawyerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name value required']
    },
    email: {
        type: String,
        required: [true, 'Email value required'],
        unique: true,
        minLength: 8
    },
    password: {
        type: String,
        required: [true, 'Password value required'],
        minLength: 6
    },
    city: {
        type: String,
        required: [true, 'City value required']
    },
    license: {
        type: String,
        required: [true, 'License value required']
    },
    keywords: {
        type: [{ type: String }],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: '',
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lawyers', lawyerSchema);