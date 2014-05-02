angular.module('personal_record.controllers.loginController', ['ionic'])
    .controller('LoginController', function($scope) {
        $scope.login_with_facebook = function() {
            facebookConnectPlugin.login(
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
