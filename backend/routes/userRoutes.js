const express = require('express');
const router = express.Router();
const { register, login, list } = require('../controllers/authController');


router.post('/register', register);


router.post('/login', login);

router.get('/list', list);
module.exports = router;
