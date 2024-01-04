const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



router.post('/signup', async (req, res) => {

});


router.post('/login', async (req, res) => {
    
});

module.exports = router;
