angular.module('personal_record.factories.workoutFactory', [])

.factory('WorkoutFactory', function() {
    var workoutFactory = {
        current_workout: {},
        current_workout_index: 0,
        workouts: [],
        add_workout: function(workout) {
            this.workouts.push(workout);
            this.current_workout_index++;
            console.log(this.workouts);
        }
    };


    return workoutFactory;
});
