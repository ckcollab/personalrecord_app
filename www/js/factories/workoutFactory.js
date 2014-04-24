angular.module('personal_record.factories.workoutFactory', [])

.factory('WorkoutFactory', function() {
    var workoutFactory = {
        last_workout: undefined,
        current_workout_index: 0,
        workouts: [],
        get_workout: function(index) {
            this.current_workout_index = index;
            this.current_workout = this.workouts[this.current_workout_index];
            return this.current_workout;
        },
        get_previous_workout: function() {
            this.current_workout_index--;
            return this.get_workout(this.current_workout_index);
        },
        get_next_workout: function() {
            this.current_workout_index++;
            return this.get_workout(this.current_workout_index)
        },
        add_workout: function(workout) {
            this.current_workout_index++;
            this.workouts.push(workout);
            this.last_workout = workout;
        },
        set_workout: function(index, workout) {
            this.workouts[index] = workout;
        }
    };

    return workoutFactory;
});
