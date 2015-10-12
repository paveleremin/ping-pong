'use strict';

angular.module('app', [
    // vendors first
    'ui.router',
    'LocalStorageModule',
    'mgcrea.ngStrap.typeahead',

    // configuration modules
    'app.env',
    'app.configs',
    'app.resources',

    // application modules
    'app.UserList',
    'app.UserAdd',
    'app.GameList',
    'app.GameAdd'
])
;
