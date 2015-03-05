app.controller('SiteCtrl', function($rootScope, $scope, $routeParams, $http, config){
	config.then(function(p){
		//Set Site Settings
		$rootScope.settings = p.settings;
		
		//Get User Settings (Handle Authentication if needed.)
		
	})

	var tools = $scope.tools = {
		
	}
	
	it.SiteCtrl = $scope;
});