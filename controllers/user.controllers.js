const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
      const { name, contact, location, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        name,
        contact,
        location,
        email,
        password: hashedPassword
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'User logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in user', error });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password').exec();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error });
    }
};