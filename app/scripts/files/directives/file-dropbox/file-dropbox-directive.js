(function(angular) {

    'use strict';

    function directive(gcodeService) {
		
        /* ----- BEGIN LINK FUNCTION FOR DIRECTIVE ----- */
        function link(scope, element, attrs) {
            scope.preUploadFile = null;

            scope.$watch( "preUploadFile", function( newValue, oldValue ){

                if( newValue != null ){

                    var file;

                    var fr = new FileReader();
                    fr.onload = function(e){

                        var contents = e.target.result;
                        file = {
                                    "name":"new file",
                                    "url":"api/file/1/new-file.gcode",
                                    "contents":contents,
                                    "image":null,
                                    "meta":{}
                                };

                        scope.uploadFile = file;
                        scope.$apply();
                        console.log(file.name);

                    };

                    fr.readAsText(newValue);

                }

            });
        }
        /* ----- END LINK FUNCTION FOR DIRECTIVE ----- */

        return {
            'restrict': 'E',
			'replace':true,
			'scope': {
                uploadFile: "=ogFdUploadFile"
            },
            'templateUrl': 'scripts/files/directives/file-dropbox/file-dropbox-template.html',
            'link': link
        };

    }

    angular
        .module('openGbApp')
        .directive('ogFileDropbox', ['gcodeService', directive ]);

})(angular);