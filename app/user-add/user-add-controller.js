'use strict';

(function (angular) {

    var Ctrl = function ($state, userApi) {
        var ctrl = this;

        ctrl.data = {};

        ctrl.onSubmit = function() {
            userApi.save(ctrl.data);
            $state.transitionTo('user-list');
        };
    };

    // INIT MODULE
    var module = angular.module('app.UserAdd', []);

    // INIT CONTROLLER
    module.controller('UserAdd', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider) {
        $stateProvider.state('user-add', {
            url: '/user-add',
            templateUrl: 'user-add/user-add.html',
            controller: Ctrl,
            controllerAs: 'ctrl'
        });
    });

})(angular);
