angular.module('personal_record.controllers.workoutController', ['ionic', 'personal_record.factories.workoutFactory', 'truncate', 'personal_record.directives', 'personal_record.filters', 'personal_record.services'])
    .controller('WorkoutController', function($scope, $ionicModal, $ionicGesture, WorkoutFactory) {
        $scope.swipe_listener = function(event) {
            // Weirdly I have to manually grab form scope here...
            var workout_form = angular.element(document.querySelector('ng-form[name="workout_form"]')).scope().workout_form;

            if (event.gesture.direction == 'left' && workout_form.$valid) {
                $scope.next_workout();
            }

            if (event.gesture.direction == 'right' && $scope.current_set_index != 0) {
                $scope.previous_workout();
            }

            $scope.$apply();
        };

        $scope.swipe_gesture = $ionicGesture.on('swipe', $scope.swipe_listener, document.getElementsByTagName('body'));

        /*
         * Init
         */
        $scope.workout_init = function(){
            $scope.workouts_array_not_empty = WorkoutFactory.get_sets().length > 0;
            $scope.current_set_index = WorkoutFactory.current_set_index;
            $scope.current_set = WorkoutFactory.get_set($scope.current_set_index);
            $scope.workout_form_focus = 'weight';
            $scope.show_summary = false;

            if($scope.current_set === undefined || $scope.current_set.exercise_name === undefined) {
                var last_set_viewed = WorkoutFactory.get_last_set_viewed();

                if(last_set_viewed !== undefined) {
                    $scope.current_set = {
                        exercise_name: last_set_viewed.exercise_name,
                        weight: last_set_viewed.weight
                    }
                } else {
                    $scope.current_set = {exercise_name: $scope.get_default_exercise()}
                }
            }
        };

        /*
         * Form
         */
        $scope.go_to_summary = function() {
            $scope.show_summary = true;

            console.log('showing summary');

            $scope.sets = WorkoutFactory.get_sets();
        };

        $scope.hide_summary = function() {
            $scope.show_summary = false;
        };

        $scope.finish_workout_button_enabled = function() {
            return $scope.workouts_array_not_empty || $scope.current_set_index > 0;
        };

        $scope.workout_form_set_focus = function(field) {
            $scope.workout_form_focus = field;
        };

        $scope.workout_form_is_focused_on = function(field){
            return $scope.workout_form_focus == field;
        };

        $scope.record_workout = function() {
            var record_success = function(mediaFiles) {
                $scope.current_set.video = mediaFiles[0];
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
            console.log('cwi: ' + $scope.current_set_index + ' >= ' + WorkoutFactory.get_sets().length);

            if ($scope.current_set_index == WorkoutFactory.get_sets().length) {
                WorkoutFactory.add_set({
                    exercise_name: $scope.current_set.exercise_name,
                    weight: $scope.current_set.weight,
                    reps: $scope.current_set.reps,
                    video: $scope.current_set.video,
                    notes: $scope.current_set.notes
                });

                $scope.current_set.reps = undefined;
            } else {
                $scope.current_set = WorkoutFactory.get_next_set();

                if($scope.current_set === undefined) {
                    var last_set_viewed = WorkoutFactory.get_last_set_viewed();

                    $scope.current_set = {
                        exercise_name: last_set_viewed.exercise_name,
                        weight: last_set_viewed.weight
                    }
                }
            }

            $scope.current_set_index = WorkoutFactory.current_set_index;
        };

        $scope.previous_workout = function() {
            $scope.current_set = WorkoutFactory.get_previous_set();
            $scope.current_set_index = WorkoutFactory.current_set_index;
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
