const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Client', clientSchema);