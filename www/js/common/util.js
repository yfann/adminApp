(function (window) {
    CSD = window.CSD || {};

    // https://github.com/BlueHuskyStudios/Micro-JS-Enum/wiki
    CSD.enum = function (enumArray) {
        var self = {
            all: [],
            keys: enumArray,
        };
        for (var i = enumArray.length; i--;) {
            self[enumArray[i]] = self.all[i] = i;
        }
        return self;
    };

    CSD.newGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    
})(window);