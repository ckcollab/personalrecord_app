angular.module('personal_record.controllers.loginController', ['ionic'])
    .controller('LoginController', function($scope) {
        FB.init();

        $scope.login_with_facebook = function() {
            FB.login(
                function() {
                    alert('success');
                },
                function() {
                    // error
                }
            );
        };


        console.log('test');
    });
