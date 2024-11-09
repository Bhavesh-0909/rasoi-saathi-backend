const Product = require('../models/product.model');
const User = require('../models/user.model');
const transporter = require('../config/nodemailer');
const cron = require('node-cron')

exports.addFoodItem = async (req, res) => {
    try {
      const { userId, productName, productAmount, productExpiry } = req.body;
  
      // Add the product to the inventory
      const product = new Product({
        productName,
        productAmount,
        productExpiry
      });
  
      await product.save();
  
      // Link product to user
      await User.findByIdAndUpdate(userId, { $push: { foodInventory: product._id } });
  
      res.status(201).json({ message: 'Food item added successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error adding food item', error });
    }
};

exports.getFoodInventory = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate('foodInventory').exec();
      res.status(200).json({ foodInventory: user.foodInventory });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching food inventory', error });
    }
}

const checkExpiryDates = async () => {
    try {
      const today = new Date();
      const nearExpiryDate = new Date(today.setDate(today.getDate() + 3)); // 3-day alert
  
      // Find food items nearing expiry within 3 days
      const expiringProducts = await Product.find({
        productExpiry: { $lte: nearExpiryDate }
      }).populate('userId', 'email name'); // Assuming userId reference in Product schema
  
      expiringProducts.forEach(async (product) => {
        const user = await User.findById(product.userId);
        await sendExpiryNotification(user.email, user.name, product.productName, product.productExpiry);
      });
    } catch (error) {
      console.error('Error checking expiry dates:', error);
    }
};

const sendExpiryNotification = async (email, name, productName, productExpiry) => {
    try {  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Expiry Alert: ${productName} is nearing expiry`,
        text: `Hi ${name},\n\nThe product "${productName}" will expire on ${productExpiry.toDateString()}.\nPlease consume it soon to avoid waste.\n\nThank you for using our app!`
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`Expiry notification sent to ${email} for ${productName}`);
    } catch (error) {
      console.error('Error sending expiry notification:', error);
    }
};
  
  // Schedule expiry checks to run daily
cron.schedule('0 0 * * *', () => {
    console.log('Running daily expiry check');
    checkExpiryDates();
});

exports.deleteFoodItem = async (req, res) => {
    try {
        const { userId} = req.body;
        const productId = req.params.id;

        // Remove the product from the inventory
        await Product.findByIdAndDelete(productId);

        // Unlink product from user
        await User.findByIdAndUpdate(userId, { $pull: { foodInventory: productId } });

        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting food item', error });
    }
};




  