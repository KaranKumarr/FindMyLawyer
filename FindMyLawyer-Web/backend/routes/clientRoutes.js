const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getClients, registerClient, loginClient, getSingleClient } = require('../controllers/clientController');


router.route('/').get(getClients).post(registerClient);

router.route('/login').post(loginClient);

router.route('/:id').get(getSingleClient);

module.exports = router;