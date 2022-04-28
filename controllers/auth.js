const { isUser, isGuest } = require('../middleware/guards.js');
const { register, login } = require('../services/user.js');
const mapErrors = require('../utils/mappers.js');
const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required');
        } else if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }

        const user = await register(req.body.email, req.body.password, req.body.description);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('register', { title: 'Register Page', data: { email: req.body.email, description: req.body.description }, errors });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('login', {title: 'Login Page', data: { email: req.body.email }, errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;