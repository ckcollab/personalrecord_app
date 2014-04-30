angular.module('personal_record.controllers.tabController', ['ionic', 'personal_record.factories.workoutFactory'])
    .controller('TabController', function($scope, WorkoutFactory) {
        $scope.sets = WorkoutFactory.get_sets();
    });
