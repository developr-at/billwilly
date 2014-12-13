(function () {
    'use strict';

    angular
        .module('app.login')
        .directive('compareTo', compareTo);

    function compareTo() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                function validator(modelValue) {
                    ngModel.$setValidity('compareTo', modelValue === scope.otherModelValue);
                    return modelValue;
                }

                //For DOM -> model validation
                ngModel.$parsers.unshift(validator);
                //For model -> DOM validation
                ngModel.$formatters.unshift(validator);

                scope.$watch(function() { return scope.otherModelValue; }, function (newValue, oldValue) {
                    validator(ngModel.$viewValue);
                });
            }
        };
    }

})();