const express = require('express');
const router = express.Router();
const {
    getLawyers,
    registerLawyer,
    updateLawyer,
    deleteLawyer,
    getSingleLawyer,
    loginLawyer,
    getTopRatedLawyers,
    getSearchedLawyers
} = require('../controllers/lawyerController.js');
const { protect } = require("../middleware/authMiddleware");

router.route('/').get(getLawyers).post(registerLawyer);

router.route('/top').get(getTopRatedLawyers);

router.route('/search/:query').get(getSearchedLawyers);

router.route('/login').post(loginLawyer);

router.route('/:lawyerId').get(protect, getSingleLawyer).put(updateLawyer).delete(deleteLawyer);

module.exports = router;