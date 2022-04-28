const { isUser, isOwner } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { createAd, updateAd, deleteAd, apply } = require('../services/ad.js');
const mapErrors = require('../utils/mappers.js');


const router = require('express').Router();

router.get('/create', isUser(),  (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    let ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id
    };


    try {
        await createAd(ad);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: ad, errors });
    }
});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id
    };

    try {
        await updateAd(id, ad);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        ad._id = id;
        const errors = mapErrors(err);
        res.render('edit', { title: 'Edit Page', ad, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteAd(req.params.id);
    res.redirect('/catalog')
});


router.get('/apply/:id/', preload(), isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await apply(id, req.session.user._id);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('details', { title: 'Details Page', errors });
    }
});



module.exports = router;