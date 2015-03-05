app.factory('config', function ($http, $q) {
	var deferred = $q.defer();
	var setup = function(config){
		return $q(function(resolve, reject){
			Parse.initialize(config.parseAppId, config.parseJsKey);
			$http.defaults.headers.common['X-Parse-Application-Id'] = config.parseAppId;
			$http.defaults.headers.common['X-Parse-REST-API-Key'] = config.parseRestKey;
			$http.defaults.headers.common['Content-Type'] = 'application/json';
			// Stripe.setPublishableKey(config.stripeKey);
			if(config.fireRoot)
				config.fireRef = new Firebase(config.fireRoot);
			$http.get('https://api.parse.com/1/classes/SiteSettings').then(function(response){
				var settings = {};
				for(var i=0; i<response.data.results.length; i++)
					settings[response.data.results[i].key] = response.data.results[i].value;
				config.settings = settings;
				resolve(config);
			})
		})
	}

	var whois = {
		parseRoot: 			'https://api.parse.com/1',
	 	parseAppId: 		'9Q6UyqrVchOyUDnrFuO3oUUCBfg9dIkvwqFcWrAD',
	 	parseJsKey: 		'sc2X2rAxKhrDWSljMz7huSchpyiA9xFPxHw3pFqn',
	 	parseRestKey: 		'mCLwZSK5xfQYFCGpn0rFGrMH24rLnRPxHPl01QHr'
	}
	
	
	if(localStorage.whois){
		var config = angular.fromJson(localStorage.whois);
		setup(config).then(function(config){
			deferred.resolve(config);
		})
	}else{
		//Setup Temporary WHOIS Headers
		$http.defaults.headers.common['X-Parse-Application-Id'] = whois.parseAppId;
		$http.defaults.headers.common['X-Parse-REST-API-Key'] = whois.parseRestKey;
		$http.defaults.headers.common['Content-Type'] = 'application/json';
		$http.post('https://api.parse.com/1/functions/Lookup', {url: window.location.host}).then(function(response){
			var config = response.data.result;
				config.parseRoot = whois.parseRoot;
			if(!config.secureUrl)
				config.secureUrl = window.location.origin;
				
			//GOTCHA!  THIS WILL CACHE, DON'T PUBLISH UNTIL A SECURE URL HAS BEEN ENTERED INTO THE DB...
			localStorage.setItem('whois', angular.toJson(config))
			setup(config).then(function(config){
				deferred.resolve(config);
			})
		})
	}
	return deferred.promise;
});