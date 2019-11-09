var express = require('express');
var app = express();
var localConfig = require('./local.json');

exports.app = app;
exports.localConfig = localConfig;