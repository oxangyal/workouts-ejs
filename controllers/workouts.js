const Workout = require("../models/Workout");

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ createdBy: req.user._id }).sort("CreatedAt");
    res.render("workouts", { workouts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving workouts");
  }
};

const addWorkout = async (req, res) => {
    try {
        const { workoutType, duration, intensity, notes } = req.body;
        const newWorkout = new Workout({
            workoutType,
            duration,
            intensity,
            notes,
            createdBy: req.user._id,
        });

        await newWorkout.save();

        // Fetch all workouts and render the view
        const workouts = await Workout.find({ createdBy: req.user._id }).sort(
            "CreatedAt"
        );
        res.render("workouts", { workouts });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding a new workout");
    }
};

const showNewWorkoutForm = (req, res) => {
  res.render("workout", { workout: null });
};

const showEditWorkoutForm = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).send("Workout not found");
    }

    if (workout.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("You do not have permisson to edit this workout");
    }
    res.render("workout", { workout });
  } catch (error) {
    console.log(error);
    res.send(500).send("Error retrieving workout");
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    
    const { workoutType, duration, intensity, notes } = req.body;

    const workout = await Workout.findById(workoutId);
    if (!workout) {
        return res.status(404).send("Workout not found");
    }

    if (workout.createdBy.toString() !== req.user._id.toString()) {
        return res
            .status(403)
            .send("You do not have permission to edit this workout");
    }

    // Update workout properties
    // workout.workoutType = workoutType;
    // workout.duration = duration;
    // workout.intensity = intensity;
    // workout.notes = notes;

    await workout.save();

    res.send("Workout updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating workout");
  }
};

const deleteWorkout = async (req, res) => {
    try {
        const workoutId = req.params.id;

        const workout = await Workout.findById(workoutId);
        if (!workout) {
            return res.status(404).send("Workout not found");
        }

        if (workout.createdBy.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .send("You do not have permission to delete this workout");
        }

        await workout.deleteOne();

        res.send("Workout deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting workout");
    }
};

module.exports = {
    getAllWorkouts,
    addWorkout,
    showNewWorkoutForm,
    showEditWorkoutForm,
    updateWorkout,
    deleteWorkout,
};
