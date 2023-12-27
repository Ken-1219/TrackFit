const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutScheema = Schema({
    title: {
        type: String,
        required: true
    },
    //Repititions
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Workout', workoutScheema);;