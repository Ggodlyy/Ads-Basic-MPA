const express = require('express');
const { create } = require('express-handlebars');
const session = require('express-session');
const userSession = require('../middleware/userSession.js');

module.exports = (app) => {
    app.engine('.hbs', create({
        extname: '.hbs',
    }).engine);

    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));

    app.use(userSession());
};