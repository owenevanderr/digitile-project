const {sequelize} = require('./models');
const authRoutes = require('./routes/authRoutes');
const express = require('express');

const app = express();

// mvc based routing 
app.use(authRoutes);

async function main(){
    await sequelize.sync({alter: true});
    console.log('database synced!');
}

main();