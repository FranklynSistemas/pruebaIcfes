angular.module('app.controllers', [])

.controller('loginCtrl', function($scope,$rootScope,$state,$ionicPopup,$ionicLoading,$http, service) {

$scope.vm = {};
$rootScope.name = "";

function init(){
	if( localStorage.getItem('Token') != null){
		$state.go("home");
	}
}; init();

function error(msg){
	var alertPopUp = $ionicPopup.alert({
		    title : "Error",
		    template : msg
		});
		alertPopUp.then(function(){
		});
};

$scope.ingresar = function(){
	$ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Solicitando Ubicación!'
    });
	service.login($http,$scope.vm).then(function(result){
		 $ionicLoading.hide();
		 $rootScope.name = result.nombres;
		 localStorage.setItem('Nombres',result.nombres);
		 localStorage.setItem('Token',result.accessToken);
		 $state.go('home');
	},function(err){
		if(!err.status){
			error(err.info);
			$ionicLoading.hide();
		}
	}); 
};

})
.controller('homeCtrl', function($scope,$rootScope,$state,$http,$ionicPopup,$ionicLoading,service) {
	
	$scope.paint = [];

	function init(){
		service.dominio($http).then(function(result){
			 $ionicLoading.hide();
			 localStorage.setItem('DominioAPP', JSON.stringify(result.data));
			 mach();
		},function(err){
			if(!err.status){
				error(err.info);
				$ionicLoading.hide();
			}
		});
	}; init();
	

	function error(msg){
	var alertPopUp = $ionicPopup.alert({
		    title : "Error",
		    template : msg
		});
		alertPopUp.then(function(){
		});
	};

	function mach(){
		service.sede($http).then(function(result){
		 $ionicLoading.hide();
		 var dominio = JSON.parse(localStorage.getItem('DominioAPP'));
		 find(dominio, result.data);
			 //$state.go('home');
		},function(err){
			if(!err.status){
				error(err.info);
				$ionicLoading.hide();
			}
		});
	};

	function find(dominio, sede){
		var resultTemp = [];
		for (var i = 0; i < sede.length; i++) {
			for (var j = 0; j < dominio.length; j++) {
				if(dominio[j].id == sede[i]){
					resultTemp.push(dominio[j].descripcion);
				}
			}
		}

		$scope.paint = resultTemp;
		$rootScope.name = localStorage.getItem('Nombres');
	};

	$scope.salir = function(){
		 localStorage.removeItem("Token");
		 localStorage.removeItem("DominioAPP");
		 $state.go('login');
	}

})