'use strict';

angular.module('myApp.bills', ['ngRoute', 'Algorithm'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bills', {
            templateUrl: 'bills/bills.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ["$scope", "findSubset", function ($scope, findSubset) {
        // $scope.curInput = 10;
        // $scope.bills = [12, 34, 24, 43, 1, 1];
        (localStorage.getItem('bills') === null) ? $scope.bills = [] : $scope.bills = JSON.parse(localStorage.getItem('bills'));

        // localStorage.setItem('bills', $scope.bills);
        $scope.curIndice = [];
        $scope.onEnterBill = function (inputValue) {
            // console.log(inputValue);
            $scope.bills.push(inputValue);
            localStorage.setItem('bills',JSON.stringify($scope.bills));
            $scope.curInput = null;
        };
        $scope.removeBill = function (index) {
            $scope.bills.splice(index, 1);
            localStorage.setItem('bills',JSON.stringify($scope.bills));
        };
        $scope.removeBills = function () {
            $scope.bills = [];
            localStorage.setItem('bills',JSON.stringify($scope.bills));
        };
        $scope.resolve = function () {
            // alg.cal($scope.target, $scope.bills);
            $scope.results = findSubset($scope.target, $scope.bills);
        };
        $scope.propertyName = 'bias';
        $scope.reverse = false;

        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.onRowClick = function (indice) {
            $scope.curIndice = indice;
            console.log($scope.curIndice);
        }
    }]);