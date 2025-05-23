const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch(err){
        res.status(400).json({error: err.message });
    }
}
);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email});
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { username: user.username, email: user.email}});
}
);  

const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({ created: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


module.exports =router;