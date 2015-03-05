app.lazy.controller('MainCtrl', function($rootScope, $scope, $routeParams, $http, config){
	config.then(function(p){
		$scope.config = p;
		$http.post(p.parseRoot+'/classes/visit', {data: 'Something'}).then(function(response){
			$scope.response = response;
		})
		$http.get(p.parseRoot+'/classes/visit').then(function(response){
			//Fake stuff to make it work...
			var slides = response.data.results;
			for(var i=0; i<slides.length; i++)
				angular.extend(slides[i], {
					title: slides[i].data,
					description: slides[i].objectId
				})
			$scope.page = {
				carousel: {
					slide: slides
				}
			}
			$scope.manifest = [
				{
					type: 'carousel',
					slides: slides
				},
				{
					type: 'carousel',
					slides: slides
				}
			]
		})
	})


	var data = $scope.data = {
		welcome: 'Hi There!',
	}
	var tools = $scope.tools = {
		
	}

	
	it.MainCtrl = $scope;
});