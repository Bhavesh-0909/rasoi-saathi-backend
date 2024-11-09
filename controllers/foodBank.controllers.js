const FoodBank = require('../models/foodBank.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerFoodBank = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
      const { name, contact, location, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const foodBank = new FoodBank({
        name,
        contact,
        location,
        email,
        password: hashedPassword
      });
  
      await foodBank.save();
      res.status(201).json({ message: 'Food Bank registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering food bank', error });
    }
};

exports.loginFoodBank = async (req, res) => {
    try {
      const { email, password } = req.body;
      const foodBank = await FoodBank.findOne({ email });
      if (!foodBank) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, foodBank.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ foodBankId: foodBank._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Food Bank logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in food bank', error });
    }
  };