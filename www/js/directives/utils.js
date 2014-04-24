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
    .directive('onEnter', function($parse) {
        return {
            restrict: 'A',
            scope: {
                onEnter: "@"
            },
            link: function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        console.log(attrs.onEnter);
                        //scope.$eval(attrs.onEnter);
                        var fn = $parse(attrs.onEnter);

                        scope.$apply(function() {
                            fn(scope, {$event: event});
                        });

                        event.preventDefault();
                    }
                });
            }
        };
    })
    .directive('focusOn', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                scope.$on(attr.focusOn, function(e, name) {
                    console.log('called');
                    elem[0].focus();
                });
            }
        };
    });
