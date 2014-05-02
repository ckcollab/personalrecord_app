angular.module('personal_record', ['ionic', 'ngResource', 'personal_record.controllers', 'personal_record.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('login', {
            url: '/',
            templateUrl: "templates/login.html"
        })

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })

        // Each tab has its own nav history stack:
        .state('tab.welcome', {
            url: '/welcome',
            views: {
                'tab-welcome': {
                    templateUrl: 'templates/tab-welcome.html',
                    controller: 'WelcomeController'
                }
            }
        })
        .state('tab.workout', {
            url: '/workout',
                views: {
                    'tab-workout': {
                        templateUrl: 'templates/tab-workout.html',
                        controller: 'WorkoutController'
                    }
                }
            }
        )
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountController'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/welcome');
});

