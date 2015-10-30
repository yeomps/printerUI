(function(angular) {

    'use strict';

    /* ----- BEGIN FUNCTION FOR FACTORY ----- */
    function factory($websocket) {

        var baseUrl = 'ws://localhost:8000/ws';
        var printerFactory = {};
        var ws = $websocket.$new(baseUrl);

	ws.$on('$open', function () {

            console.log('Oh my gosh, websocket is really open! Fukken awesome!');

            var data = {
			    'jsonrpc': '2.0',
			    'id':       1,
			    'method':   'set_temp',
			    'params': {
			      'bed':      105,
			      'nozzle1':  206,
			      'nozzle2':  203
			    }
			};

            ws.$$send(data);

          });

	ws.$$ws.onmessage = function(message){
		console.log(message);
	}

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


	printerFactory.ws = ws;
        return printerFactory;

    }
    /* ----- END FUNCTION FOR FACTORY ----- */

    angular
        .module('openGbApp')
        .factory('printerFactory', ['$websocket', factory]);

})(angular);        
