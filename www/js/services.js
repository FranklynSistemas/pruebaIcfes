angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]).factory('service',function($q){

	return{
	    login: function($http,data){
	      var defer = $q.defer();
	      var req = {
	         method: 'GET',
	         url: 'http://www2.icfesinteractivo.gov.co/test-interoperabilidad-web/rest/autenticacion/correo?tipoRol=TORG',
	         headers: {
	           //'Content-Type': 'application/json',
	           'password': data.user,
	           'correoElectronico': data.pass
	         }
	         }
	        $http(req).then(function(response){
	            defer.resolve(response.data);
	        }, function(err){
	            defer.reject({status: false, info: err.data.message});
	            console.log(err);
	        });
	        return defer.promise;
		},
		dominio: function($http){
			var defer = $q.defer();
			var req = {
	         method: 'GET',
	         url: 'http://www.icfesinteractivo.gov.co/test-interoperabilidad-web/rest/dominios/APLICACION_PE',
	         headers: {
	           'Content-Type': 'application/json',
	         }
	         }
	        $http(req).then(function(response){
	            defer.resolve(response);
	        }, function(err){
	            defer.reject({status: false, info: err.data.message});
	            console.log(err);
	        });
	        return defer.promise;
		},
		sede: function($http){
			var defer = $q.defer();
			var req = {
	         method: 'GET',
	         url: 'http://www2.icfesinteractivo.gov.co//test-interoperabilidad-web/rest/grape/mot/aplicaciones?idSede=7946',
	         headers: {
	           'Content-Type': 'application/json',
	         }
	         }
	        $http(req).then(function(response){
	            defer.resolve(response);
	        }, function(err){
	            defer.reject({status: false, info: err.data.message});
	            console.log(err);
	        });
	        return defer.promise;
		}

	}
});