(function () {
    'use strict';

    angular.module('starter.services').service('adminSvc', ['$http','config', AdminSvc]);

    function AdminSvc($http, config) {
        this.$http = $http;
        this.config = config;
    }

    AdminSvc.prototype.getAll = function () {
        return this.$http.get(this.config.hosts.adminHost + 'api/admins');
    };

    AdminSvc.prototype.get = function (id) {
        return this.$http.get(this.config.hosts.adminHost + 'api/admin/' + id);
    };

    AdminSvc.prototype.create = function (admin) {
        return this.$http.post(this.config.hosts.adminHost + 'api/admin', admin);
    };

    AdminSvc.prototype.update = function (admin) {
        return this.$http.put(this.config.hosts.adminHost + 'api/admin', admin);
    };

    AdminSvc.prototype.delete = function (id) {
        return this.$http.delete(this.config.hosts.adminHost + 'api/admin/' + id);
    };



})();