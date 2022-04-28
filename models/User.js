const { model, Schema, Types: { ObjectId } } = require('mongoose');


const emailPattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String, required: true, validate: {
            validator(value) {
                return emailPattern.test(value);
            },
            message: 'Must have valid email'
        }
    },
    hashedPassword: { type: String, minlength: [5, 'password must be at least 5 charaters long']},
    description: { type: String, required: true, maxlength: [40, 'skill description must not exceed 40 characters'] },
    myAds: { type: [ObjectId], ref: 'Ad', default: [] }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;