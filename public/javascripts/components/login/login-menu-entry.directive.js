(function () {
    'use strict';

    angular
        .module('app.login')
        .directive('bwLoginMenuEntry', bwLoginMenuEntry);

    function bwLoginMenuEntry() {
        var directive = {
            'replace': 'true',
            'restrict': 'AE',
            'templateUrl': 'views/directive/login-menu-entry.ejs'
        };

        return directive;

        ////////////////////////
    }
})();