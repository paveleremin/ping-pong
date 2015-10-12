'use strict';

(function (angular) {

    var Ctrl = function (initData, gameApi) {
        var ctrl = this;

        var games = initData.games,
            users = initData.users;

        angular.forEach(games, function(game) {
            game.u1 = users.filter(function(user) {
                return user.id == game.u1;
            })[0];
            game.u2 = users.filter(function(user) {
                return user.id == game.u2;
            })[0];

            game.u1.wons = 0;
            game.u2.wons = 0;
            game.scoresToString = [];
            angular.forEach(game.scores, function(score){
                var user = score.u1 > score.u2 ? 'u1' : 'u2';
                game[user].wons++;
                game.scoresToString.push(score.u1 + ' - ' + score.u2);
            });
            game.scoresToString = game.scoresToString.join(' | ');
        });

        ctrl.games = games;

        ctrl.remove = function($index, game) {
            delete ctrl.games[$index];
            gameApi.remove(game.id);
        };
    };

    Ctrl.resolve = {
        /*@ngInject*/
        initData: function ($q, gameApi, userApi) {
            // fetch some data from the server
            return $q(function(resolve) {
                resolve({
                    users: userApi.all(),
                    games: gameApi.all()
                });
            });
        }
    };

    // INIT MODULE
    var module = angular.module('app.GameList', []);

    // INIT CONTROLLER
    module.controller('GameList', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider) {
        $stateProvider.state('game-list', {
            url: '/game-list',
            templateUrl: 'game-list/game-list.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);
