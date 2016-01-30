(function () {
    'use strict';

    angular.module('starter.services').service('localStorage', ['$q','$window', 'promiseFactory', LocalStorage]);

    function LocalStorage($q,$window, promiseFactory) {
        this.$window = $window;
        this.$q = $q;
        this.promiseFactory = promiseFactory;
    }

    LocalStorage.prototype.LOCAL_STORAGE_KEY = 'PhoenixAdmin';

    LocalStorage.prototype.loadFromStorage = function () {
        return angular.fromJson(this.$window.localStorage.getItem(this.LOCAL_STORAGE_KEY)) || [];
    };

    LocalStorage.prototype.saveToStorage = function (items) {
        this.$window.localStorage.setItem(this.LOCAL_STORAGE_KEY, angular.toJson(items));
    }

    LocalStorage.prototype.promiseWrapper = function (o) {
        return this.promiseFactory.decorate(this.$q.when(o));
    }

    LocalStorage.prototype.getAll = function () {
        return this.promiseWrapper(this.loadFromStorage());
    };

    LocalStorage.prototype.create = function (item) {

        var items = this.loadFromStorage();
        items.push(item);

        this.saveToStorage(items);
        return this.promiseWrapper(item);
    };


    LocalStorage.prototype.update = function (item) {
        var items = this.loadFromStorage();
        for (var i = 0; i < items.length; i++) {
            if (items[i].RecordID === item.RecordID) {
                items[i] = item;
                break;
            }
        }

        this.saveToStorage(items);
        return this.promiseWrapper(item);
    };


    LocalStorage.prototype.delete = function (recordID) {
        var items = this.loadFromStorage();
        var item = null;
        for (var i = 0; i < items.length; i++) {
            if (items[i].RecordID === recordID) {
                item = items[i];
                items.splice(i, 1);
                break;
            }
        }

        this.saveToStorage(items);
        return this.promiseWrapper(item);
    };
})();