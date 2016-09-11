'use strict';

angular.module('myApp.bills', ['ngRoute','Algorithm'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bills', {
            templateUrl: 'bills/bills.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ["$scope", "findSubset", function ($scope, findSubset) {
        // $scope.curInput = 10;
        $scope.bills = [12, 34, 24, 43, 1, 1];
        $scope.curIndice = [];
        $scope.onEnterBill = function (inputValue) {
            // console.log(inputValue);
            $scope.bills.push(inputValue);
            $scope.curInput = null;
        };
        $scope.removeBill = function (index) {
            $scope.bills.splice(index,1);
        };
        $scope.resolve = function () {
            // alg.cal($scope.target, $scope.bills);
            $scope.results = findSubset($scope.target, $scope.bills);
        };
        $scope.propertyName = 'bias';
        $scope.reverse = false;

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.onRowClick = function (indice) {
            $scope.curIndice = indice;
            console.log($scope.curIndice);
        }
    }]);