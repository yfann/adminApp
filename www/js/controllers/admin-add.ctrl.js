angular.module('starter.controllers').controller('AdminAddCtrl', ['$scope', '$state', 'storage','$stateParams',
    function ($scope, $state, storage, $stateParams) {

        var setPhoto = function (imageData) {
            var image = document.getElementById('adminPic');
            image.src = "data:image/jpeg;base64," + imageData;
        };

        var getAdmin = function () {
            $scope.admin = $stateParams.admin;
            if ($scope.admin == null) {
                $scope.admin =
                    {
                        RecordID: CSD.newGuid(),
                        ForeName: '',
                        LastName: '',
                        IsActive: true,
                        Email: '',
                        Photo: null,
                    };
            }
            else {
                $scope.isUpdating = true;
                if ($scope.admin.photo)
                {
                    setPhoto($scope.admin.photo);
                }
                $scope.EditAdminTitle = "Edit Administrator";
            }
        };

        var onGoBack = function (admin) {
            if ($scope.isUpdating) {
                //go to view the administrator
                $state.go('adminView', { 'admin': $scope.originalAdmin }, { reload: true });
            }
            else
            {
                //go to view the administrator
                $state.go('adminIndex');
            }
        };

        var onSave = function () {
            if (!$scope.isUpdating) {
                storage.create($scope.admin).success(function (result) {
                    //redirect to home page.
                    $state.go('adminIndex');
                }).error(function (arg) {
                    //console.log(arg.Message);
                });
            }
            else
            {
                storage.update($scope.admin).success(function (result) {
                    //redirect to home page.
                    $state.go('adminIndex');
                }).error(function (arg) {
                    //console.log(arg.Message);
                });
            }
        };

        var hasFirstNameError = function () {
            return !($scope.admin.ForeName != null && $scope.admin.ForeName.length > 0);
        };

        var hasLastNameError = function () {
            return !($scope.admin.LastName != null && $scope.admin.LastName.length > 0);
        };

        var hasEmailError = function () {
            var email = $scope.admin.Email;

            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !re.test(email);
        };

        function onSuccess(imageData) {
            $scope.admin.photo = imageData;
            setPhoto(imageData);
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        };

        var onCapturePhoto = function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 30,
                allowEdit: true,
                targetWidth: 150,
                targetHeight: 150,
                destinationType: Camera.DestinationType.DATA_URL
            });
        };

        (function init() {
            $scope.originalAdmin = angular.copy($stateParams.admin);
            $scope.EditAdminTitle = "New Administrator";
            $scope.goBack = onGoBack;
            $scope.save = onSave;

            $scope.hasFirstNameError = hasFirstNameError;
            $scope.hasLastNameError = hasLastNameError;
            $scope.hasEmailError = hasEmailError;
            $scope.capturePhoto = onCapturePhoto;

            getAdmin();
        })();

    }]);