const express = require("express");
const router = express.Router();

const workoutsController = require("../controllers/workouts");


router.get("/", workoutsController.getAllWorkouts);
router.post("/", workoutsController.addWorkout);
router.get("/new", workoutsController.showNewWorkoutForm);
router.get("/edit/:id", workoutsController.showEditWorkoutForm);
router.post("/update/:id", workoutsController.updateWorkout);
router.post("/delete/:id", workoutsController.deleteWorkout);

module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//     getAllWorkouts,
//     addWorkout,
//     showNewWorkoutForm,
//     showEditWorkoutForm,
//     updateWorkout,
//     deleteWorkout,
// } = require("../controllers/workouts");

// router.route("/").get(getAllWorkouts).post(addWorkout);
// router.route("/new").get(showNewWorkoutForm);
// router.route("/edit/:id").get(showEditWorkoutForm);
// router.route("/update/:id").post(updateWorkout);
// router.route("/delete/:id").post(deleteWorkout);

// module.exports = router;