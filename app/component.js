(function() {
    'use strict';

    angular
        .module('main')
        .component('component', {
            templateUrl: 'app/template.html',
            controller: Controller,
        });

    Controller.$inject = [
        '$scope',
        'main.bisectionService'
    ];

    function Controller($scope, bisectionService) {
        var self = this;
        self.result;

        /* public method */
        self.calculate = calculate;
        self.clear = clear;

        function calculate(equation, parameters) {
            let a = Number(parameters.a);
            let b = Number(parameters.b);
            let tolerance = Number(parameters.tolerance);

            self.solved = bisectionService.bisection(equation, a, b, tolerance);
        }

        function clear() {
            $scope.equation = undefined;
            $scope.parameters = undefined;
            self.result = undefined;
        }
    }
}());