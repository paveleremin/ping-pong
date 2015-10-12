'use strict';



angular.module('app.resources', [])
    .service('api', function() {
        function s4() {
            return Math.floor((1+Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        function guid() {
            return s4()+s4()+'-'+s4()+'-'+s4()+'-'+
                s4()+'-'+s4()+s4()+s4();
        }

        return {
            guid: guid
        };
    })
    .service('userApi', function(api, localStorageService) {
        return {
            all: function() {
                return localStorageService.get('users') || [];
            },
            get: function(id) {
                return this.all().filter(function(user) {
                    return user.id == id;
                })[0];
            },
            save: function(data) {
                data.createdAt = Date.now();
                data.id = api.guid();

                var users = this.all();
                users.push(data);
                localStorageService.set('users', users);
            }
        };
    })
    .service('gameApi', function(api, localStorageService) {
        return {
            all: function() {
                return localStorageService.get('games') || [];
            },
            get: function(id) {
                return this.all().filter(function(game) {
                    return game.id == id;
                })[0];
            },
            save: function(data) {
                data.createdAt = Date.now();
                data.id = api.guid();

                var games = this.all();
                games.push(data);
                localStorageService.set('games', games);
            },
            remove: function(id) {
                var games = this.all(),
                    index = -1;
                angular.forEach(games, function(game, i) {
                    if (game.id == id) index = i;
                });

                if (index == -1) return;
                games.splice(index, 1);
                localStorageService.set('games', games);
            }
        };
    })
;
