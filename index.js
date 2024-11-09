const app = require('./app');
const connectDB = require('./config/mongodb');
require('dotenv').config();

// Use CORS to allow requests from the frontend


const port = process.env.PORT || 8000;

// Test route to ensure the server is running
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Connect to the database
connectDB();
