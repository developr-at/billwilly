(function () {
    'use strict';

    /**
     * @class billwilly.Login.Directives
     * @description Login Directives...
     */
    angular
        .module('app.login')
        .directive('compareTo', compareTo)
        .directive('uniqueEmail', uniqueEmail);

    /**
     * @name compareTo
     * @function
     * @memberOf billwilly.Login.Directives
     */
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

    /**
     * @name uniqueEmail
     * @function
     * @memberOf billwilly.Login.Directives
     */
    function uniqueEmail(Auth) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.unique = Auth.checkEmail;
            }
        };
    }

    uniqueEmail.$inject = [ 'Auth' ];

})();