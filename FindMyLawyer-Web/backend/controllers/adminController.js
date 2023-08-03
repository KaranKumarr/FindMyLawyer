const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


// @desc sign up admin
// @route POST /api/admins
// @access public
const registerAdmin = asyncHandler(async (req, res) => {

    let { adminId, password } = req.body;
    adminId = adminId.toLowerCase();

    if (!adminId || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
        adminId,
        password: hashedPassword
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            adminId: admin.adminId,
            token: generateToken(admin._id),
            userType: 'admin'
        });
    } else {
        res.status(400);
        throw new Error('Something went wrong when registering User');
    }

});


// @desc authenticate a admin
// @route POST /api/admins/login
// @access public
const loginAdmin = asyncHandler(async (req, res) => {

    const { adminId, password } = req.body;

    // check for admin with adminId
    const admin = await Admin.findOne({ adminId });

    // compare passwords
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.status(201).json({
            _id: admin._id,
            adminId: admin.adminId,
            token: generateToken(admin._id),
            userType: 'admin'
        });
    } else {
        res.status(401);
        throw new Error("Invalid adminId or password");
    }

});

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    loginAdmin, registerAdmin
};