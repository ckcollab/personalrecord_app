angular.module('personal_record.controllers.workoutController', ['ionic', 'personal_record.factories.workoutFactory', 'truncate', 'personal_record.directives', 'personal_record.filters'])
    .controller('WorkoutController', function($scope, $ionicModal, $ionicGesture, WorkoutFactory) {
        $scope.swipe_listener = function(event) {
            // Weirdly I have to manually grab form scope here...
            var workout_form = angular.element(document.querySelector('ng-form[name="workout_form"]')).scope().workout_form;

            if (event.gesture.direction == 'left' && workout_form.$valid) {
                $scope.next_workout();
                console.log('next workout');
            }

            if (event.gesture.direction == 'right' && $scope.current_workout_index != 0) {
                $scope.previous_workout();
            }

            $scope.$apply();
        };

        $scope.swipe_gesture = $ionicGesture.on('swipe', $scope.swipe_listener, document.getElementsByTagName('body'));

        /*
         * Init
         */
        $scope.workout_init = function(){
            $scope.workouts_array_not_empty = WorkoutFactory.workouts.length > 0;
            $scope.current_workout_index = WorkoutFactory.current_workout_index;
            $scope.current_workout = WorkoutFactory.get_workout($scope.current_workout_index);
            $scope.workout_form_focus = 'weight';
            $scope.show_summary = false;

            if($scope.current_workout === undefined || $scope.current_workout.exercise_name === undefined) {
                if(WorkoutFactory.last_workout !== undefined) {
                    $scope.current_workout = {
                        exercise_name: WorkoutFactory.last_workout.exercise_name,
                        weight: WorkoutFactory.last_workout.weight
                    }
                } else {
                    $scope.current_workout = {exercise_name: $scope.get_default_exercise()}
                }
            }
        };

        /*
         * Form
         */
        $scope.go_to_summary = function() {
            $scope.show_summary = true;

            $scope.workouts = WorkoutFactory.get_workouts();
        };

        $scope.finish_workout_button_enabled = function() {
            return $scope.workouts_array_not_empty || $scope.current_workout_index > 0;
        };

        $scope.workout_form_set_focus = function(field) {
            $scope.workout_form_focus = field;
        };

        $scope.workout_form_is_focused_on = function(field){
            return $scope.workout_form_focus == field;
        };

        $scope.record_workout = function() {
            var record_success = function(mediaFiles) {
                $scope.current_workout.video = mediaFiles[0];
                $scope.$apply();
            };

            var record_error = function() {

            };

            var options = {
                limit: 1
            };

            navigator.device.capture.captureVideo(record_success, record_error, options);
        };

        $scope.next_workout = function() {
            console.log('cwi: ' + $scope.current_workout_index + ' >= ' + WorkoutFactory.workouts.length);

            if ($scope.current_workout_index == WorkoutFactory.workouts.length) {
                WorkoutFactory.add_workout({
                    exercise_name: $scope.current_workout.exercise_name,
                    weight: $scope.current_workout.weight,
                    reps: $scope.current_workout.reps,
                    video: $scope.current_workout.video
                });

                $scope.current_workout.reps = undefined;
            } else {
                $scope.current_workout = WorkoutFactory.get_next_workout();

                if($scope.current_workout === undefined) {
                    $scope.current_workout = {
                        exercise_name: WorkoutFactory.last_workout.exercise_name,
                        weight: WorkoutFactory.last_workout.weight
                    }
                }
            }

            $scope.current_workout_index = WorkoutFactory.current_workout_index;
        };

        $scope.previous_workout = function() {
            $scope.current_workout = WorkoutFactory.get_previous_workout();
            $scope.current_workout_index = WorkoutFactory.current_workout_index;
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
                    'Back Squat',
                    'Front Squat',
                    'Hack Squat'
                ]
            },
            {
                id: 2,
                name: "Chest",
                exercises: [
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
                name: "Shoulders",
                exercises: [
                    'Barbell Press',
                    'Dumbbell Press',
                    'Arnold Press'
                ]
            },
            {
                id: 4,
                name: "Back",
                exercises: [
                    'Pull ups',
                    'Chin ups',
                    'Wide pull ups',
                    'Rows',
                    'Kroc Rows'
                ]
            },
            {
                id: 5,
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
            $scope.current_workout.exercise_name = exercise_name;
            $scope.closeModal()
        };
        $scope.get_weight_range = function(min, max, step) {
            step = (step === undefined) ? 1 : step;
            var input = [];
            for (var i = min; i <= max; i += step) input.push(i);
            return input;
        };

        /*
         * Exercise selection modal stuff
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


        /*
         * Cleanup
         */
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
            $ionicGesture.off($scope.swipe_gesture, 'swipe', $scope.swipe_listener);
        });
    });
