const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');


//get all workouts
const getAllWorkouts = async (req, res) => {

    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}

//get a single workout
const getSingleWorkout = async (req, res) => {
    //To check if the id is a valid type of ID
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Workout Found!" });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: "No such Workout Found!" });
        }
        res.status(200).json(workout);

    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }

}

//post a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = []; //to check what fields are empty, to throw custom erros

    if (!title) {
        emptyFields.push('title');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    }


    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, reps, load, user_id });
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}


//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    //To check if the id is a valid type of ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Workout Found!" });
    }

    //find and delete the workout
    const workout = await Workout.findOneAndDelete({ _id: id });
    try {
        if (!workout) {
            return res.status(40).json({ error: "No such Workout Found!" });
        }

        res.status(200).json(workout);

    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
};


//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    //To check if the id is a valid type of ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Workout Found!" });
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        //the data to be updated is obtained using req.body but it will be an object so we need to spread it using spread operator '...'
        ...req.body
    });

    if (!workout) {
        return res.status(400).json({ error: "No such Workout Found!" });
    }
    res.status(200).json(workout);
}



module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    updateWorkout,
    deleteWorkout
}