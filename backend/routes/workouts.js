const express = require('express');
const {
    createWorkout,
    getSingleWorkout,
    getAllWorkouts,
    updateWorkout,
    deleteWorkout
} = require('../controllers/workoutController');
const router = express.Router();


//To GET all workouts
router.get('/', getAllWorkouts);


//To GET a single workout
router.get('/:id', getSingleWorkout);


//To POST a new workout
router.post('/', createWorkout);

//To DELETE a workout
router.delete('/:id', deleteWorkout);

//To UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;