angular.module('personal_record.directives.utils', [])
    .directive('selectOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    this.select();
                });
            }
        };
    })
    .directive('onEnterUp', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13 || event.which === 9) {
                        var fn = $parse(attrs.onEnterUp);

                        scope.$apply(function() {
                            fn(scope, {$event: event});
                        });

                        event.preventDefault();
                    }
                });
            }
        };
    })
    .directive('onEnterUpBlur', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13 || event.which === 9) {
                        element[0].blur();
                    }
                });
            }
        };
    })
    .directive('focusOn', function() {
        return {
            restrict: 'A',
            scope: {
                focusOn: '='
            },
            link: function(scope, elem, attr) {
                scope.$watch('focusOn', function(newValue, oldValue){
                    if(newValue){
                        elem[0].focus();
                    }
                });
            }
        };
    });
