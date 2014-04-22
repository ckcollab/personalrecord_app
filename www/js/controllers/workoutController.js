angular.module('personal_record.controllers.workoutController', ['ionic', 'personal_record.factories.workoutFactory'])
    .controller('WorkoutController', function($scope, $ionicModal, WorkoutFactory) {
        $scope.current_workout_index = 0;

        /*
         * Init
         */
        $scope.workout_init = function(){
            $scope.current_set = WorkoutFactory.current_workout;
            $scope.current_workout_index = WorkoutFactory.current_workout_index;

            if($scope.current_set.exercise_name === undefined) {
                $scope.current_set.exercise_name = $scope.get_default_exercise();
                console.log('taco');
            }
        };

        /*
         * Form
         */
        $scope.workout_form_valid = function() {
            return $scope.workout_form.$valid;
        };

        $scope.next_workout = function() {
            $scope.current_workout_index++;

            var old_exercise_name = $scope.current_set.exercise_name;

            if($scope.current_workout_index > WorkoutFactory.workouts.length) {
                console.log('bigga ' + $scope.current_workout_index);
                WorkoutFactory.add_workout($scope.current_set);

                $scope.current_set = {exercise_name: old_exercise_name};
            } else if($scope.current_workout_index == WorkoutFactory.workouts.length) {
                $scope.current_set = {exercise_name: old_exercise_name};
            } else {
                $scope.current_set = WorkoutFactory.workouts[$scope.current_workout_index];
            }
        };

        $scope.previous_workout = function() {
            $scope.current_workout_index--;
            $scope.current_set = WorkoutFactory.workouts[$scope.current_workout_index];
        };

        /*
         * Get/set exercises
         */
        $scope.exercises = [
            {
                id: 0,
                name: "The Big 3",
                exercises: [
                    'Back Squat',
                    'Bench',
                    'Deadlift'
                ]
            },
            {
                id: 1,
                name: "Legs",
                exercises: [
                    'Front Squat',
                    'Hack Squat'
                ]
            },
            {
                id: 2,
                name: "Chest",
                exercies: [
                    'Bench',
                    'Incline Bench',
                    'Decline Bench',
                    'Dumbbell Bench',
                    'Incline Dumbbell Bench',
                    'Decline Dumbbell Bench'
                ]
            },
            {
                id: 3,
                name: "Back",
                exercises: [
                    'Pull ups',
                    'Chin ups',
                    'Wide pull ups'
                ]
            },
            {
                id: 4,
                name: "Other",
                exercises: [
                    'Write it in notes!'
                ]
            }
        ];
        $scope.get_default_exercise = function() {
            // Basically a placeholder for a better, more complex function
            return 'Back Squat';
        };
        $scope.set_exercise = function(exercise_name) {
            $scope.current_set.exercise_name = exercise_name;
            $scope.closeModal()
        };
        $scope.get_weight_range = function(min, max, step) {
            step = (step === undefined) ? 1 : step;
            var input = [];
            for (var i = min; i <= max; i += step) input.push(i);
            return input;
        };

        /*
         Modal stuff
         */
        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
    });
