//server
const express = require('express');
const path = require('path');
const url = require('url');
const app = express();

app.use(express.static(path.join(__dirname, 'app/html')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/html', 'index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/html', 'login.html'));
});

app.get('/look', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/html', 'look.html'));
});

app.get('/share', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/html', 'share.html'));
});

//ERROR Handling
app.use(function(req, res, next) {
    const error = new Error('Page Not Found');
    error.status(404);
    res.send('404 Page Not Found');
    next(error);
});

app.use(function(req, res, next) {
    const error = new Error('method Allowed');
    error.status(405);
    res.send('405 method Allowed');
    next(error);
});

app.use(function(req, res, next) {
    const error = new Error('Service Unavailable');
    error.status(503);
    res.send('503 Service Unavailable');
    next(error);
});

app.use(function(req, res, next) {
   const error = new Error('Unauthorized');
   error.status(401);
   res.send('401 Unauthorized');
   next(error);
});

app.use(function(error, req, res, next) {
   res.status(error.status || 500);    

   res.send('500 Internal Server Error');
});

module.exports = app;