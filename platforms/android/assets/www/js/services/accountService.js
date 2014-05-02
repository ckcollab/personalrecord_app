angular.module('personal_record.services.accountService', ['ngResource'])
    .factory('AccountService', function($resource) {
        return $resource('http://localhost:8000/api/account/1/');
    });
