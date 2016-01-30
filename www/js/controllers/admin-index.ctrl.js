angular.module('starter.controllers').controller('AdminIndexCtrl', function ($scope, storage, enums, $state,$log) {

    var getAdminList = function () {
        storage.getAll().success(function (result) {

            $scope.originList = result;
            angular.forEach($scope.originList, function (admin) {
                if (admin.Photo) {
                    admin.PhotoData = "data:image/jpeg;base64," + admin.Photo;
                }
            });

            search();
        })
        .error(function (arg) {

        });
    };

    //used for UI
    var activeFilter = function (activeStatus) {

        $scope.currentActiveStatus = activeStatus;

        search();
    };

    var onAddAdmin = function () {
        $state.go('adminAdd');
    };

    var onViewAdmin = function (event,admin) {
        //go to view the administrator
        $state.go('adminView', {'admin' :admin});
    };

    var onSwipeLeft = function (admin) {
        admin.isShowDelete = true;
    };
    
    var onSwipeRight = function (admin) {
        admin.isShowDelete = false;
    };

    var onDeleteAdmin = function (event, admin, index) {
        event.stopPropagation();
        storage.delete(admin.RecordID).success(function () {
             
            $scope.originList.splice(index, 1);
            search();
        });
    };

    //filter active status logic
    var filterActive = function (status, admin) {
        if (status === enums.AdminActive.All) {
            return true;
        }
        else if (status === enums.AdminActive.Active && admin.IsActive) {
            return true;
        }
        else if (status === enums.AdminActive.InActive && !admin.IsActive) {
            return true;
        }
    };
    //search logic
    var searchAdmin=function(str,admin)
    {
        if(str==null || str=='')
        {
            return true;
        }

        var strs = str.toLowerCase().split(/\s+/gi);

        for(var i=0;i<strs.length;i++)
        {
            if(admin.ForeName.toLowerCase().indexOf(strs[i])>-1 || admin.LastName.toLowerCase().indexOf(strs[i])>-1 )
            {
                return true;
            }
        }
    }

    var search = function () {
        $log.debug($scope.searchStr);

        //clear list
        $scope.resultList.splice(0, $scope.resultList.length);
        //search list
        angular.forEach($scope.originList, function (user) {
            if (filterActive($scope.currentActiveStatus, user) && searchAdmin($scope.searchStr,user))
            {
                $scope.resultList.push(user);
            }
        });

    };

    var clearSearch = function () {
        $scope.searchStr = '';
        search();
    };

    (function init() {
        $scope.originList = [];
        $scope.resultList = [];

        $scope.currentActiveStatus = enums.AdminActive.All;
        $scope.enums = enums;
        $scope.searchStr = '';

        $scope.getAdminList = getAdminList;
        $scope.addAdmin = onAddAdmin;
        $scope.viewAdmin = onViewAdmin;
        $scope.activeFilter = activeFilter;
        $scope.swipeLeft = onSwipeLeft;
        $scope.swipeRight = onSwipeRight;
        $scope.deleteAdmin = onDeleteAdmin;
        $scope.search = search;
        $scope.clearSearch = clearSearch;

        $scope.getAdminList();

    })();
});
