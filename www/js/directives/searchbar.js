angular.module('starter.directives').directive('searchBar', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/searchbar.html',
        controller: 'SearchBarCtrl',
        link: function (scope,element) { }
    };
});