const app = require('./app');
const connectDB = require('./config/mongodb');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

connectDB();