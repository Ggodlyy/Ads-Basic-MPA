const { model, Schema, Types: { ObjectId } } = require('mongoose');


const adSchema = new Schema({
    headline: { type: String, minlength: [4, 'Headline should be a at least 4 characters long'] },
    location: { type: String, minlength: [8, 'Location should be at least 8 characters long'] },
    companyName: { type: String, minlength: [3, 'Company name should be at least 3 characters long'] },
    companyDescription: { type: String, required: true, maxlength: [40, 'Company description must not exceed 40 characters'] },
    author: { type: ObjectId, ref: 'User', },
    appliedUsers: { type: [ObjectId], ref: 'User', default: [] },
});



const Ad = model('Ad', adSchema);

module.exports = Ad;