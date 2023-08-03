const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');
const Lawyer = require('../models/lawyerModel');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// @desc Get clients
// @route GET /api/clients
// @access private
const getClients = asyncHandler(async (req, res) => {

    const clients = await Client.find();

    if (clients) {
        res.status(200).json(clients);
    } else {
        res.status(404);
        throw new Error("Could not retrieve clients for some reason");
    }

});


// @desc Get single client
// @route GET /api/clients/:id
// @access private
const getSingleClient = asyncHandler(async (req, res) => {

    const client = await Client.findById(req.params.id).select('-password');

    if (client) {
        res.status(200).json(client);
    } else {
        res.status(404);
        throw new Error('No such client found');
    }

});


// @desc sign up client
// @route POST /api/clients
// @access public
const registerClient = asyncHandler(async (req, res) => {

    let { name, email, password } = req.body;
    email = email.toLowerCase();

    if (!email || !password || !name) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // check if user exists    
    const clientExists = await Client.findOne({ email });
    const lawyerExists = await Lawyer.findOne({ email });
    if (clientExists || lawyerExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const client = await Client.create({
        email,
        name,
        password: hashedPassword
    });

    if (client) {
        res.status(201).json({
            _id: client._id,
            name: client.name,
            email: client.email,
            token: generateToken(client._id),
            userType: 'client'
        });
    } else {
        res.status(400);
        throw new Error('Something went wrong when registering User');
    }

});


// @desc authenticate a client
// @route POST /api/clients
// @access public
const loginClient = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // check for client with email
    const client = await Client.findOne({ email });

    // compare passwords
    if (client && (await bcrypt.compare(password, client.password))) {
        res.status(201).json({
            _id: client._id,
            name: client.name,
            email: client.email,
            token: generateToken(client._id),
            userType: 'client'
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }

});


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    getClients, registerClient, loginClient, getSingleClient
};