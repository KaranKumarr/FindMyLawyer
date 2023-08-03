const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { loginAdmin, registerAdmin } = require('../controllers/adminController');

router.route('/').post(registerAdmin);
router.route('/login').post(loginAdmin);

module.exports = router;
