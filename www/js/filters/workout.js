angular.module('personal_record.filters.workout', [])
    .filter('tonnage', function() {
        return function(workouts) {
            var total_tonnage = 0;

            workouts.forEach(function(workout) {
                total_tonnage += workout.weight * workout.reps;
            });

            return total_tonnage;
        };
    });
