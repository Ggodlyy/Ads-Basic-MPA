let authController = require('../controllers/auth.js');
let homeController = require('../controllers/home.js');
let adController = require('../controllers/ad.js');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(adController);

    app.get('*', (req, res) => {
        res.render('404', {title: 'Page not Found'});
    })
}