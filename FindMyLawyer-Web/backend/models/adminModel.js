const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminId: {
        type: String,
        required: [true, 'adminId value required'],
        unique: true,
        minLength: 4
    },
    password: {
        type: String,
        required: [true, 'Password value required'],
        minLength: 6
    },
});

module.exports = mongoose.model('Admin', adminSchema);