const preload = require('../middleware/preload.js');
const { getAllAds} = require('../services/ad.js');
const { getUserByEmail } = require('../services/user.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let ads = await getAllAds();
    let neededAdsToShow = ads.slice(0, 3);
    res.render('home', { title: 'Home Page', neededAdsToShow });
});

router.get('/catalog', async (req, res) => {
    let ads = await getAllAds();
    res.render('catalog', { title: 'Home Page', ads });
});

router.get('/catalog/:id', preload(true), async (req, res) => {
    const ad = res.locals.ad;
    ad.appliedNumber = ad.appliedUsers.length;

    if (req.session.user) {
        ad.hasUser = true;

        if (ad.author._id == req.session.user._id) {
            ad.isAuthor = true;
        } else {
            ad.hasApplied = ad.appliedUsers.find(o => o._id == req.session.user._id);
        }
    }

    res.render('details', { title: 'Details Page', });
});


router.get('/search', (req, res) => {
    res.render('search', { title: 'Search Page' });
});

router.post('/search', async (req, res) => {
    const emailPattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/i;

    let validEmail = emailPattern.test(req.body.search);


    if (validEmail) {
        const user = await getUserByEmail(req.body.search);
        let ads = await getAllAds();
        console.log(ads);
        console.log(user);

        let userAds = ads.filter(o => (o.author).toString() == (user._id).toString());
        console.log(userAds);

        res.render('search', { title: 'Search Page', userAds});
    } else {
        res.render('search', { title: 'Search Page', search: req.body.search });
    }
});

module.exports = router;