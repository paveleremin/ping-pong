'use strict';

angular.module('app.configs', [])
    //.config(function ($locationProvider){
     //   //html5Mode required <base> tag
	//	$locationProvider.html5Mode(true);
	//})
    .config(function ($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    })
;
