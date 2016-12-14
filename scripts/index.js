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
            });
            var evaluated = eval(code).toFixed(5);

            var alert = $mdDialog.alert()
                .title('Результат')
                .textContent(isNaN(evaluated) ? 'Ошибка' : evaluated)
                .ok('Закрыть');

            $mdDialog
                .show(alert)
                .finally(function() {
                    alert = undefined;
                });
        };
        $scope.setFormula = function(formulaNumber) {
            if (formulaNumber === 1) {
              $scope.variables = [['y', 1], ['p', 1], ['f', 1]];
              $scope.formula = 'Math.log2({y} / ({p} * {f} * 2 * Math.sqrt(2)))';
            }
            else if (formulaNumber === 2) {
              $scope.variables = [['y', 1], ['p', 1], ['f', 1]];
              $scope.formula = 'Math.log2(({y} * Math.sqrt(1 + {p} * {p})) / (034 * {p} * {f}))';
            }
            else if (formulaNumber === 3) {
              $scope.variables = [['y', 1], ['b', 1], ['f', 1]];
              $scope.formula = 'Math.log2(({y} * Math.sqrt(0.33 + {b} * {b})) / (3 * {f} * {b})) - 1';
            }
            else if (formulaNumber === 4) {
              $scope.variables = [['f', 1], ['b', 1]];
              $scope.formula = '(3 * {f}) / (Math.sqrt(1 + 3 * {b} * {b}))';
            }
            else if (formulaNumber === 5) {
              $scope.variables = [['Kp', 1.2], ['Ti', 110], ['K', 0.7], ['T1', 35], ['Ed', 50000], ['Kt', 0.25], ['Ym', 1600000], ['dU', 30000]];
              $scope.formula = '({K}*{Kp}*{T1}+{K}*{K}*{Kp}*{Kp}*{Ti})/({T1}*{T1}*{Ti})+Math.sqrt(Math.pow(({K}*{Kp}*{T1}+{K}*{K}*{Kp}*{Kp}*{Ti})/({T1}*{T1}*{Ti}),2)-(({K}*{K}*{Kp}*{Kp}*({Ed}*{Ed}-1)+{Ed}*{Ed}*{Ti}*{Ti}*Math.pow(1+{K}*{Kp},2))/({Ed}*{Ed}*{Ti}*{Ti}*{T1}*{T1})))';
            }
            else if (formulaNumber === 6) {
              $scope.variables = [['Kp', 1.2], ['Ti', 110], ['K', 0.7], ['T1', 35], ['Ed', 50000], ['Kt', 0.25], ['Ym', 1600000], ['dU', 30000]];
              $scope.formula = '({K}*{Kp}*{T1}+{K}*{K}*{Kp}*{Kp}*{Ti})/({T1}*{T1}*{Ti})-Math.sqrt(Math.pow(({K}*{Kp}*{T1}+{K}*{K}*{Kp}*{Kp}*{Ti})/({T1}*{T1}*{Ti}),2)-(({K}*{K}*{Kp}*{Kp}*({Ed}*{Ed}-1)+{Ed}*{Ed}*{Ti}*{Ti}*Math.pow(1+{K}*{Kp},2))/({Ed}*{Ed}*{Ti}*{Ti}*{T1}*{T1})))';
            }
        };
    });
