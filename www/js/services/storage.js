(function () {
    'use strict';

    angular.module('starter.services').factory('storage', function ($injector, enums, config) {

        

        if(config.storage === enums.StorageType.Web)
        {
            return $injector.get('adminSvc');
        }
        else if (config.storage === enums.StorageType.Local)
        {
            return $injector.get('localStorage');
        }

    });

})();