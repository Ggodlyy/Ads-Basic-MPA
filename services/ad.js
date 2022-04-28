const Ad = require('../models/Ad.js');

async function createAd(ad) {
    let result = new Ad(ad);
    await result.save();
}

async function getAllAds() {
    return Ad.find({}).lean();
}

async function getAdById(id) {
    return Ad.findById(id).lean();
}

async function getModifiedAd(id) {
    return Ad.findById(id)
        .populate('author', 'email')
        .populate('appliedUsers', 'email description')
        .lean();
}

async function updateAd(id, ad) {
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName;
    existing.companyDescription = ad.companyDescription;

    await existing.save();
}

async function deleteAd(id) {
   await Ad.findByIdAndDelete(id);
}

async function apply(id, userId) {
    const ad = await Ad.findById(id);

    if (ad.appliedUsers.includes(userId)) {
        throw new Error('User has already voted');
    }

    ad.appliedUsers.push(userId);

    await ad.save();
}




module.exports = {
    createAd,
    getAllAds,
    getAdById,
    getModifiedAd,
    updateAd,
    deleteAd,
    apply,
}