angular.module('personal_record.filters.workout', [])
    .filter('tonnage', function() {
        return function(workouts) {
            var total_tonnage = 0;

            console.log(workouts);

            workouts.forEach(function(workout) {
                console.log(workout);
                total_tonnage += workout.weight * workout.reps;
            });

            return total_tonnage;
        };
    });
