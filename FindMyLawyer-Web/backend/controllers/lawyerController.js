const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Lawyer = require('../models/lawyerModel');
const Client = require('../models/clientModel');
const asyncHandler = require('express-async-handler');

// @desc Get Lawyers
// @route GET /api/lawyers
// @access private
const getLawyers = asyncHandler(async (req, res) => {

    const lawyers = await Lawyer.find();

    res.status(200).json(lawyers);
});



// @desc create lawyer
// @route POST /api/lawyers
// @access public
const registerLawyer = asyncHandler(async (req, res) => {


    const { name, email, password, city, license, keywords, phone, address } = req.body;

    if (!email || !password || !name || !city) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // check if user exists
    const lawyerExists = await Lawyer.findOne({ email });
    const clientExists = await Client.findOne({ email });
    if (lawyerExists || clientExists) {
        res.status(400);
        throw new Error("Lawyer already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const lawyer = await Lawyer.create({
        email: email,
        name: name,
        password: hashedPassword,
        city: city,
        license: license,
        keywords: keywords,
        phone,
        address
    });

    if (lawyer) {
        res.status(201).json({
            _id: lawyer._id,
            name: lawyer.name,
            email: lawyer.email,
            token: generateToken(lawyer._id),
            userType: 'lawyer'
        });
    } else {
        res.status(400);
        throw new Error("Error creating lawyer");
    }

});


// @desc Authenticate a lawyer
// @route GET /api/lawyers/login
// @access public
const loginLawyer = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // check for lawyer with email
    const lawyer = await Lawyer.findOne({ email });

    // compare password
    if (lawyer && (await bcrypt.compare(password, lawyer.password))) {
        res.status(201).json({
            _id: lawyer._id,
            name: lawyer.name,
            email: lawyer.email,
            token: generateToken(lawyer._id),
            userType: 'lawyer'
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }

});

// @desc get one lawyer
// @route GET /api/lawyers/:id
// @access private
const getSingleLawyer = asyncHandler(async (req, res) => {
    const lawyer = await Lawyer.findById(req.params.lawyerId).select('-password');

    if (!lawyer) {
        res.status(400);
        throw new Error("Lawyer not found");
    }

    res.status(200).json(lawyer);
});

// @desc update lawyer
// @route update /api/lawyers/:id
// @access private
const updateLawyer = asyncHandler(async (req, res) => {
    const lawyer = Lawyer.findById(req.params.lawyerId);

    if (!lawyer) {
        res.status(400);
        throw new Error("Lawyer not found");
    }
    const updatedLawyer = await Lawyer.findByIdAndUpdate(req.params.lawyerId, req.body, {
        new: true
    });

    res.status(200).json(updatedLawyer);
});

// @desc delete lawyer
// @route DELETE /api/lawyers/:id
// @access private
const deleteLawyer = asyncHandler(async (req, res) => {

    const lawyer = await Lawyer.findById(req.params.lawyerId);

    if (!lawyer) {
        res.status(400);
        throw new Error("lawyer not found");
    }

    await lawyer.remove();

    res.status(200).json({ "lawyerId": req.params.lawyerId });
});

// @desc get lawyer top rated lawyers
// @route GET /api/lawyers/top
// @access public
const getTopRatedLawyers = asyncHandler(async (req, res) => {

    let lawyers = await Lawyer.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: '_id',
                foreignField: 'lawyer',
                as: "reviews",
            },
        }
    ]);

    lawyers = lawyers.filter((lawyer, i) => {
        let review = {
            count: 0,
            rating: 0,
            score: 0
        };

        if (lawyer.reviews.length > 0) {
            lawyer.reviews.forEach(item => {
                review.count++;
                review.score += item.rating;
            });
            review.rating = review.score / review.count;
        }


        Object.assign(lawyer, { rating: review.rating, score: review.score, count: review.count });

        if (lawyer.rating >= 4)
            return lawyer;
    });


    lawyers = lawyers.sort((a, b) => (a.score < b.score ? 1 : -1));

    res.status(200).json({ lawyers });

});


// @desc get lawyer top rated lawyers
// @route GET /api/lawyers/search/:query
// @access public
const getSearchedLawyers = asyncHandler(async (req, res) => {

    const query = (req.params.query).toLowerCase();

    let lawyers = await Lawyer.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: '_id',
                foreignField: 'lawyer',
                as: "reviews",
            },
        }
    ]);

    lawyers = lawyers.filter((lawyer) => {

        const nameWords = lawyer.name.split(" ");
        queryWords = query.split(" ");
        let item;

        nameWords.forEach((word) => {
            if (word.toLowerCase() === query) {
                item = lawyer;
            } else {
                queryWords.forEach((query) => {
                    if (word.toLowerCase() === query) {
                        item = lawyer;
                    }
                });
            }
        });

        lawyer.keywords.forEach((keyword) => {
            if (keyword.toLowerCase().trim() === query.toLowerCase()) {
                item = lawyer;
            } else {
                queryWords.forEach((query) => {
                    if (keyword.toLowerCase() === query.toLowerCase().trim()) {
                        item = lawyer;
                    }
                });
            }
        });

        return item;
    });


    lawyers = lawyers.map((lawyer) => {
        let review = {
            count: 0,
            rating: 0,
            score: 0
        };

        if (lawyer.reviews.length > 0) {
            lawyer.reviews.forEach(item => {
                review.count++;
                review.score += item.rating;
            });
            review.rating = review.score / review.count;
        }

        Object.assign(lawyer, { rating: review.rating, score: review.score, count: review.count });

        return lawyer;
    });

    lawyers = lawyers.sort((a, b) => (a.score < b.score ? 1 : -1));


    res.status(200).json({ lawyers });
});


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    getLawyers, registerLawyer, deleteLawyer, updateLawyer, getSingleLawyer, loginLawyer, getTopRatedLawyers, getSearchedLawyers
};