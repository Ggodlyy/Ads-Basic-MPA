const adService = require('../services/ad.js');

function preload(populate) {
    return async (req, res, next) => {
        const id = req.params.id;

        if (populate) {
            res.locals.ad = await adService.getModifiedAd(id);
        } else {
            res.locals.ad = await adService.getAdById(id);
        }

        next();
    }
}


module.exports = preload;