require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user');

const app = express();


//JSON middleware
app.use(express.json());
// logger middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
//using this middleware to bypass the CORS - Cross-Origin-Resource-Sharing
app.use(cors({ origin: 'http://localhost:3000' }));


//Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);


//connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        //Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Server is running on Port: ', process.env.PORT);
        });
    })
    .catch((err) => console.log("Error connecting to Database: ", err.message));


module.exports = app;





