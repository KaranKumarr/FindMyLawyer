const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Lawyer = require('../models/lawyerModel');
const Client = require('../models/clientModel');
const Admin = require('../models/adminModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            //     Get Token from header
            token = req.headers.authorization.split(' ')[1];

            //     Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //     Get User Data
            req.lawyer = await Lawyer.findById(decoded.id).select('-password');
            if (!req.lawyer && !req.admin) {
                req.client = await Client.findById(decoded.id).select('-password');
            } else if (!req.lawyer && !req.client) {
                req.admin = await Client.findById(decoded.id).select('-password');
            }

            next();
        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

module.exports = { protect };