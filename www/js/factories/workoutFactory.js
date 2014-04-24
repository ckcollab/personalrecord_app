angular.module('personal_record.factories.workoutFactory', [])

.factory('WorkoutFactory', function() {
    var workoutFactory = {
        current_workout: {},
        current_workout_index: 0,
        workouts: [],
        add_workout: function(workout) {
            this.workouts.push(workout);
        }
        // get_next_workout
        // get_previous_workout
    };


    return workoutFactory;
});
