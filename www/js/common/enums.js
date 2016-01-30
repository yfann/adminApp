angular.module('starter.common').factory('enums', function () {
    'use strict';

    return {
        AdminActive: CSD.enum([
            'All',
            'Active',
            'InActive'
        ]),
        StorageType: CSD.enum([
            'Web',
            'Local'
        ]),
        StorageIdentity: {
            Admin: '12707664-215A-445C-9963-285536D66C3A'
        }
    };
});