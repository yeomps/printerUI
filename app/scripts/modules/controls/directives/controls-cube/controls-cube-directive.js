(function(angular) {

    'use strict';

    function directive() {
		
        /* ----- BEGIN LINK FUNCTION FOR DIRECTIVE ----- */
        function link(scope, element, attrs) {

			scope.side = "edge-top";

			var addPositions = function(a,b){
				var result = parseFloat( parseFloat(a) + parseFloat(b)).toFixed(2);
				result = result > 0 ? result : 0 ;
				return result;
			};
			var subtractPositions = function(a,b){
				var result = parseFloat( parseFloat(a) - parseFloat(b)).toFixed(2);
				result = result > 0 ? result : 0 ;
				return result;
			};

			scope.jogUpX = function(){
				scope.posX = addPositions(scope.posX, scope.resolution);
			};
			scope.jogDownX = function(){
				scope.posX = subtractPositions(scope.posX, scope.resolution);
			};
			scope.jogUpY = function(){
				scope.posY = addPositions(scope.posY, scope.resolution);
			};
			scope.jogDownY = function(){
				scope.posY = subtractPositions(scope.posY, scope.resolution);
			};
			scope.jogUpZ = function(){
				scope.posZ = addPositions(scope.posZ, scope.resolution);
			};
			scope.jogDownZ = function(){
				scope.posZ = subtractPositions(scope.posZ, scope.resolution);
			};

        }
        /* ----- END LINK FUNCTION FOR DIRECTIVE ----- */

        return {
            'restrict': 'E',
			'replace':true,
			'scope': {
				posX:'=ccPosX',
				posY:'=ccPosY',
				posZ:'=ccPosZ',
				resolution:'=ccResolution'
            },
            'templateUrl': '/scripts/controls/directives/controls-cube/controls-cube-template.html',
            'link': link
        };

    }

    angular
        .module('openGbApp')
        .directive('controlsCube', directive);

})(angular);