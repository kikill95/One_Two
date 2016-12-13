angular.module('app', ['ngMaterial'])
    .controller('AppController', function($scope, $mdDialog) {
        $scope.variables = [];
        $scope.formula = '';
        $scope.add = function() {
            $scope.variables.push([]);
        };
        $scope.removeLast = function() {
            $scope.variables.pop();
        };
        $scope.calculate = function() {
            var length = $scope.variables.length;
            if (length === 0) {
                return;
            }
            var code = $scope.formula.replace(/\{.{0,3}\}/g, function(founded) {
                for(var i = 0; i < length; i++) {
                    if ($scope.variables[i][0] === founded.substr(1, founded.length - 2)) {
                        return $scope.variables[i][1];
                    }
                }
                return 1;
            });

            var alert = $mdDialog.alert()
                .title('Результат')
                .textContent(eval(code))
                .ok('Закрыть');

            $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
                });
        };
    });
