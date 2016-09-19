'use strict';

angular.module('myApp.bills', ['ngRoute', 'Algorithm'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bills', {
            templateUrl: 'bills/bills.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ["$scope", "findSubset", 'findSubsetWithLJKAlgorithm', function ($scope, findSubset, findSubsetWithLJKAlgorithm) {
        $scope.threshold = 15; // If there are more than threshold bills, use ljkAlgorithm.
        (localStorage.getItem('bills') === null) ? $scope.bills = [] : $scope.bills = JSON.parse(localStorage.getItem('bills'));
        $scope.deviation = 0;
        $scope.curIndices = [];
        $scope.propertyName = 'bias';
        $scope.reverse = false;
        $scope.results = [];

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
            if ($scope.bills.length == 0) return;
            if ($scope.bills.length <= $scope.threshold) {
                $scope.results = findSubset($scope.target, $scope.bills);
            } else {
                let result = findSubsetWithLJKAlgorithm($scope.target, $scope.bills, $scope.deviation);
                console.log("Got result:", result);
                $scope.results = [result];
            }

        };

        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.onRowClick = function (indices) {
            $scope.curIndices = indices;
            console.log($scope.curIndices);
        };

        $scope.$watch("bills", function (newVal, oldVal) {
            // Every time bills is changed, clear results and curIndices.
            $scope.results = [];
            $scope.curIndices = [];
        }, true);

    }]);