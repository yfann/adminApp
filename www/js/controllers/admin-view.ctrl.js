angular.module('starter.controllers').controller('AdminViewCtrl', ['$scope', '$state', '$stateParams', 
    function ($scope, $state, $stateParams) {
        

        var onGoToList = function () {
            $state.go('adminIndex');
        };

        var onEditAdmin = function (admin) {
            $state.go('adminAdd', { 'admin': admin });
        };

        (function init() {
            
            $scope.admin = $stateParams.admin;
            $scope.admin.IsActiveString = $scope.admin.IsActive ? 'Active' : 'Inactive';
            $scope.editAdmin = onEditAdmin;
            $scope.goToList = onGoToList;
        })();
    }]);