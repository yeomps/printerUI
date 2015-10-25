(function(angular) {

    'use strict';

    /* ----- BEGIN FUNCTION FOR FACTORY ----- */
    function factory($websocket) {

        var baseUrl = '';
        var printerFactory = {};
        var ws = $websocket.$new(baseUrl);

        printerFactory.loadFile = function (file) {
            return null
        };

        printerFactory.startPrint = function (file) {
            return null
        };

        printerFactory.pausePrint = function (file) {
            return null
        };

        printerFactory.tempUpdate = function (file) {
            return null
        };

        printerFactory.printProgress = function (file) {
            return null
        };

        printerFactory.zChange = function (file) {
            return null
        };


        return fileFactory;

    }
    /* ----- END FUNCTION FOR FACTORY ----- */

    angular
        .module('openGbApp')
        .factory('printerFactory', ['$websocket', factory]);

})(angular);        
