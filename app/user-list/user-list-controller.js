'use strict';

(function (angular) {

    var Ctrl = function (initData) {
        var ctrl = this;

        var users = initData.users,
            games = initData.games;

        function getResults(game, user) {
            var results = {
                wons: 0,
                lost: 0
            };

            // skip game, if user not take part
            if (game.u1 == user.id || game.u2 == user.id) {
                angular.forEach(game.scores, function(score) {
                    if (score.u1 == score.u2) return;

                    if (user.id == game.u1) {
                        if (score.u1 > score.u2) {
                            results.wons++;
                        }
                        else {
                            results.lost++;
                        }
                    }
                    else {
                        if (score.u2 > score.u1) {
                            results.wons++;
                        }
                        else {
                            results.lost++;
                        }
                    }
                });
            }

            return results;
        }


        angular.forEach(users, function(user) {
            angular.forEach(games, function(game){
                // get results of this game
                var results = getResults(game, user);
                user.wons = results.wons;
                user.lost = results.lost;
            });
        });

        ctrl.users = initData.users;

        ctrl.wonsPercent = function(user){
            if (!user.wons) return 0;
            if (!user.lost) return 100;
            return Math.round(user.wons / user.lost * 100, 4);
        };
    };

    Ctrl.resolve = {
        /*@ngInject*/
        initData: function ($q, userApi, gameApi) {
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
    var module = angular.module('app.UserList', []);

    // INIT CONTROLLER
    module.controller('UserList', Ctrl);

    // INIT ROUTE
    module.config(function ($stateProvider) {
        $stateProvider.state('user-list', {
            url: '/',
            templateUrl: 'user-list/user-list.html',
            controller: Ctrl,
            resolve: Ctrl.resolve,
            controllerAs: 'ctrl'
        });
    });

})(angular);
