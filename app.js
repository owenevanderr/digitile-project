const {sequelize} = require('./models');
const authRoutes = require('./routes/authRoutes');
const express = require('express');

const app = express();
app.use(express.json());

// mvc based routing 
app.use(authRoutes);

app.listen(3000, async () => {
    console.log('server is running on http://localhost:3000')
    await sequelize.authenticate(); // connect to database
    console.log('database connected!');
});