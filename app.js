const {sequelize} = require('./models');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser()); // TO USE THE REQ.COOKIES, YOU MUST DEFINE THIS LINE.

// Load environment variables from the .env file
require('dotenv').config();

// enabling cors
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true 
    })
);

// mvc based routing 
app.use(authRoutes);
app.use(postRoutes);


app.listen(3001, async () => {
    console.log('server is running on http://localhost:3001')
    await sequelize.authenticate(); // connect to database
    console.log('database connected!');
});