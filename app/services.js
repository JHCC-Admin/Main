app.factory('fileService', function ($http, $q, config) {
	var fileService = {
		upload:function(details,b64,successCallback,errorCallback){
			var deferred = $q.defer();
			var file = new Parse.File(details.name, { base64: b64});
			file.save().then(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	}

	it.fileService = fileService;
	return fileService;
});

app.factory('dataService', function ($http, $q, config) {
	var dataService = {
		upload:function(details,b64,successCallback,errorCallback){
			var deferred = $q.defer();
			var file = new Parse.File(details.name, { base64: b64});
			file.save().then(function(data) {
				deferred.resolve(data);
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	}

	it.dataService = dataService;
	return dataService;
});