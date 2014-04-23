angular.module('personal_record.controllers.tabController', ['ionic', 'personal_record.factories.workoutFactory'])
    .controller('TabController', function($scope, WorkoutFactory) {
        console.log('test');
        $scope.workouts = WorkoutFactory.workouts;
    });
