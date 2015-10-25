(function(angular) {

    'use strict';

    function controller($scope, $http, fileFactory, lodash, gcodeService){

    	function getAllFiles(){

    		fileFactory.getFiles()
	            .success(function (files) {

                    vm.fileList = files;

	            })
	            .error(function (error) {
	                console.log( 'Unable to load files data: ' + error );
	            });

    	}

        function addFile(file){

            fileFactory.insertFile(file)
                .success(function (files) {

                    console.log(files);
                    vm.fileList = files;
                    vm.selectedFile = vm.uploadFile;

                })
                .error(function (error) {
                    console.log( 'Unable to load files data: ' + error );
                });


        }

        function preflightCheck(){
            setTimeout(function(){vm.printReady = true;$scope.$apply()}, 5000);
        };

        // In order to watch a 'vm.' vs '$scope.' object, you must use .$watch(function(){},function(){}) format
        $scope.$watch(
            function watchUploadFile( scope ) {
                return( vm.uploadFile );
            },
            function handleUploadFileChange( newValue, oldValue ) {
                if (newValue != null) {

                    addFile( vm.uploadFile );
                    vm.fileSelector = false;
                    setTimeout(function(){ vm.selectedFile = vm.uploadFile; $scope.$apply(); }, 10);

                }
            }
        );

        $scope.$watch(
            function watchSelectedFile( scope ) {
                return( vm.selectedFile );
            },
            function handleSelectedFileChange( newValue, oldValue ) {
                if (newValue != null) {

                    vm.fileSelector = false;
                    vm.fileRenderer = true;
                    vm.printReady = false;

                    if(!vm.selectedFile.contents && vm.selectedFile.url){

                        var file = {};
                        angular.copy(vm.selectedFile, file);
                        vm.selectedFile = null;

                        $http.get(file.url).success(
                                                    function (data) {
                                                        file.contents = data;
                                                        vm.selectedFile = file;
                                                    }).error(function () {
                                                        console.error( 'Unable to load file: ' , error );
                                                    });

                    }

                    if(vm.selectedFile){
                        preflightCheck();
                    }

                }
            }
        );



    	var vm = this;

    	vm.fileList = {};
        vm.selectedFile = null;

    	getAllFiles();

        vm.fileSelector = true;
        vm.fileRenderer = false;
        vm.printReady = null;
        vm.gcode = null;

        vm.selectFile = function(file){
            vm.selectedFile = file;
        };

        vm.deselectFile = function(){
            vm.selectedFile = null;
            vm.fileSelector = true;
            vm.fileRenderer=false;
            vm.printReady=null;
        };


    }

    angular
        .module('openGbApp')
        .controller('fileController', ['$scope', '$http', 'fileFactory', 'lodash', 'gcodeService', controller ]);

})(angular);    