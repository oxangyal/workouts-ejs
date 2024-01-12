const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
    {
        workoutType: {
            type: String,
            required: [true, "Please provide workout type"],
            enum: ["running", "swimming", "biking"],
        },
        duration: {
            type: Number,
            required: [true, "Please provide duration in minutes"],
            min: 1,
        },
        intensity: {
            type: String,
            enum: ["low", "moderate", "high"],
            default: "low",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide user"],
        },
        indoor: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
