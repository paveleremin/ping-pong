'use strict';

(function (angular) {

    var Ctrl = function (initData, $state, gameApi) {
        var ctrl = this;

        ctrl.maxScores = 5;
        ctrl.users = initData.users;

        ctrl.data = {
            u1: null,
            u2: null,
            scores: [{
                u1: null,
                u2: null
            }]
        };

        ctrl.onSubmit = function() {
            gameApi.save(ctrl.data);
            $state.transitionTo('user-list');
        };

        ctrl.addSet = function() {
            if (ctrl.data.scores == ctrl.maxScores) return;
            ctrl.data.scores.push({
                u1: null,
                u2: null
            });
        };
    };

    Ctrl.resolve = {
        /*@ngInject*/
        initData: function ($q, userApi) {
            // fetch some data from the server
            return $q(function(resolve) {
                resolve({
                    users: userApi.all()
                });
            });
        }
    };

    // INIT MODULE
    var module = angular.module('app.GameAdd', []);

    // INIT CONTROLLER
    module.controller('GameAdd', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider) {
        $stateProvider.state('game-add', {
            url: '/game-add',
            templateUrl: 'game-add/game-add.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);
