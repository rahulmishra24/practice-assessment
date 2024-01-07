const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config')



auth.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(`SIGN_UP|ERROR|${err}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


auth.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid username' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        const token = jwt.sign({ user: { id: user._id } }, config.jwt_secret);
        res.json({ token });
    } catch (err) {
        console.error(`LOGIN|ERROR|${err}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = auth;
